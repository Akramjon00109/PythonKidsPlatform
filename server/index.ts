import express, { type Request, Response, NextFunction } from "express";
import cron from "node-cron";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";
import { generateDailyLessons } from "./services/gemini.service";
import { initializeTelegramBot, sendDailyLessonsToChannel } from "./services/telegram.service";

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
  // Scheduler for daily lesson generation
  let isGenerating = false;

  async function generateLessonsForDate(date: string) {
    if (isGenerating) {
      log(`⏭️  Lesson generation already in progress, skipping for ${date}`);
      return;
    }

    try {
      isGenerating = true;
      log(`📚 Checking lessons for ${date}...`);
      
      const existingLessons = await storage.getLessonsByDate(date);
      if (existingLessons.length > 0) {
        log(`✅ Lessons already exist for ${date} (${existingLessons.length} lessons)`);
        return;
      }

      log(`🤖 Generating new lessons for ${date}...`);
      const newLessons = await generateDailyLessons(date);
      
      const createdLessons = [];
      for (const lesson of newLessons) {
        const created = await storage.createLesson(lesson);
        createdLessons.push(created);
      }
      
      log(`✅ Successfully generated ${newLessons.length} lessons for ${date}`);
      
      // Send to Telegram channel
      await sendDailyLessonsToChannel(createdLessons);
    } catch (error) {
      log(`❌ Error generating lessons for ${date}: ${error}`);
      console.error("Lesson generation error:", error);
    } finally {
      isGenerating = false;
    }
  }

  // Backfill: Generate today's lessons on server start if missing
  const today = new Date().toISOString().split("T")[0];
  generateLessonsForDate(today).catch((error) => {
    log(`Failed to backfill today's lessons: ${error}`);
  });

  // Schedule daily lesson generation at 09:00 Asia/Tashkent time (UTC+5)
  // Cron format: minute hour * * *
  // 09:00 Tashkent = 04:00 UTC
  cron.schedule("0 4 * * *", async () => {
    const date = new Date().toISOString().split("T")[0];
    log(`⏰ Scheduled job triggered for ${date}`);
    await generateLessonsForDate(date);
  }, {
    timezone: "UTC"
  });

  log(`📅 Daily lesson scheduler initialized (runs at 09:00 Tashkent time)`);

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
