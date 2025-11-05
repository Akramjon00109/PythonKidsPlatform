import express, { type Request, Response, NextFunction } from "express";
import cron from "node-cron";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";
import { generateDailyLessons } from "./services/gemini.service";
import { generateDailyTips } from "./services/tips.service";
import { initializeTelegramBot, sendLessonToChannel, sendTipToChannel } from "./services/telegram.service";

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  // Scheduler for daily lesson and tip generation
  let isGeneratingLessons = false;
  let isGeneratingTips = false;

  async function generateContentForDate(date: string) {
    try {
      log(`📚 Checking content for ${date}...`);
      
      const existingLessons = await storage.getLessonsByDate(date);
      const existingTips = await storage.getTipsByDate(date);
      
      if (existingLessons.length === 0 && !isGeneratingLessons) {
        isGeneratingLessons = true;
        try {
          log(`🤖 Generating new lessons for ${date}...`);
          const newLessons = await generateDailyLessons(date);
          
          for (const lesson of newLessons) {
            await storage.createLesson(lesson);
          }
          
          log(`✅ Successfully generated ${newLessons.length} lessons for ${date}`);
        } finally {
          isGeneratingLessons = false;
        }
      } else if (existingLessons.length > 0) {
        log(`✅ Lessons already exist for ${date} (${existingLessons.length} lessons)`);
      }

      if (existingTips.length === 0 && !isGeneratingTips) {
        isGeneratingTips = true;
        try {
          log(`💡 Generating new tips for ${date}...`);
          const newTips = await generateDailyTips(date);
          
          for (const tip of newTips) {
            await storage.createTip(tip);
          }
          
          log(`✅ Successfully generated ${newTips.length} tips for ${date}`);
        } finally {
          isGeneratingTips = false;
        }
      } else if (existingTips.length > 0) {
        log(`✅ Tips already exist for ${date} (${existingTips.length} tips)`);
      }
    } catch (error) {
      log(`❌ Error generating content for ${date}: ${error}`);
      console.error("Content generation error:", error);
    }
  }

  async function postLessonToChannel(lessonNumber: number, date: string) {
    try {
      const lessons = await storage.getLessonsByDate(date);
      const lesson = lessons.find(l => l.lessonNumber === lessonNumber);
      
      if (lesson) {
        await sendLessonToChannel(lesson);
      } else {
        log(`⚠️  Lesson ${lessonNumber} not found for ${date}`);
      }
    } catch (error) {
      log(`❌ Error posting lesson ${lessonNumber}: ${error}`);
    }
  }

  async function postTipToChannel(tipNumber: number, date: string) {
    try {
      const tips = await storage.getTipsByDate(date);
      const tip = tips.find(t => t.tipNumber === tipNumber);
      
      if (tip) {
        await sendTipToChannel(tip);
      } else {
        log(`⚠️  Tip ${tipNumber} not found for ${date}`);
      }
    } catch (error) {
      log(`❌ Error posting tip ${tipNumber}: ${error}`);
    }
  }

  // Backfill: Generate today's content on server start if missing
  const today = new Date().toISOString().split("T")[0];
  generateContentForDate(today).catch((error) => {
    log(`Failed to backfill today's content: ${error}`);
  });

  // Schedule content generation at 09:00 Tashkent time (04:00 UTC)
  cron.schedule("0 4 * * *", async () => {
    const date = new Date().toISOString().split("T")[0];
    log(`⏰ Content generation job triggered for ${date}`);
    await generateContentForDate(date);
  }, {
    timezone: "UTC"
  });

  // Schedule lesson posts throughout the day (Tashkent time = UTC+5)
  // Dars 1: 10:00 Tashkent = 05:00 UTC
  cron.schedule("0 5 * * *", async () => {
    const date = new Date().toISOString().split("T")[0];
    log(`📖 Posting lesson 1 for ${date}`);
    await postLessonToChannel(1, date);
  }, { timezone: "UTC" });

  // Dars 2: 12:00 Tashkent = 07:00 UTC
  cron.schedule("0 7 * * *", async () => {
    const date = new Date().toISOString().split("T")[0];
    log(`📖 Posting lesson 2 for ${date}`);
    await postLessonToChannel(2, date);
  }, { timezone: "UTC" });

  // Dars 3: 14:00 Tashkent = 09:00 UTC
  cron.schedule("0 9 * * *", async () => {
    const date = new Date().toISOString().split("T")[0];
    log(`📖 Posting lesson 3 for ${date}`);
    await postLessonToChannel(3, date);
  }, { timezone: "UTC" });

  // Dars 4: 16:00 Tashkent = 11:00 UTC
  cron.schedule("0 11 * * *", async () => {
    const date = new Date().toISOString().split("T")[0];
    log(`📖 Posting lesson 4 for ${date}`);
    await postLessonToChannel(4, date);
  }, { timezone: "UTC" });

  // Dars 5: 18:00 Tashkent = 13:00 UTC
  cron.schedule("0 13 * * *", async () => {
    const date = new Date().toISOString().split("T")[0];
    log(`📖 Posting lesson 5 for ${date}`);
    await postLessonToChannel(5, date);
  }, { timezone: "UTC" });

  // Schedule tip posts throughout the day
  // Maslahat 1: 11:00 Tashkent = 06:00 UTC
  cron.schedule("0 6 * * *", async () => {
    const date = new Date().toISOString().split("T")[0];
    log(`💡 Posting tip 1 for ${date}`);
    await postTipToChannel(1, date);
  }, { timezone: "UTC" });

  // Maslahat 2: 13:00 Tashkent = 08:00 UTC
  cron.schedule("0 8 * * *", async () => {
    const date = new Date().toISOString().split("T")[0];
    log(`💡 Posting tip 2 for ${date}`);
    await postTipToChannel(2, date);
  }, { timezone: "UTC" });

  // Maslahat 3: 15:00 Tashkent = 10:00 UTC
  cron.schedule("0 10 * * *", async () => {
    const date = new Date().toISOString().split("T")[0];
    log(`💡 Posting tip 3 for ${date}`);
    await postTipToChannel(3, date);
  }, { timezone: "UTC" });

  // Maslahat 4: 17:00 Tashkent = 12:00 UTC
  cron.schedule("0 12 * * *", async () => {
    const date = new Date().toISOString().split("T")[0];
    log(`💡 Posting tip 4 for ${date}`);
    await postTipToChannel(4, date);
  }, { timezone: "UTC" });

  // Maslahat 5: 19:00 Tashkent = 14:00 UTC
  cron.schedule("0 14 * * *", async () => {
    const date = new Date().toISOString().split("T")[0];
    log(`💡 Posting tip 5 for ${date}`);
    await postTipToChannel(5, date);
  }, { timezone: "UTC" });

  log(`📅 Content scheduler initialized`);
  log(`📖 Lessons will be posted at: 10:00, 12:00, 14:00, 16:00, 18:00 Tashkent time`);
  log(`💡 Tips will be posted at: 11:00, 13:00, 15:00, 17:00, 19:00 Tashkent time`);

  // Initialize Telegram bot
  initializeTelegramBot();

  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
