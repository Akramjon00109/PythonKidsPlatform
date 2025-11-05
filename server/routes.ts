import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateDailyLessons } from "./services/gemini.service";
import { generateDailyTips } from "./services/tips.service";
import { insertLessonSchema, insertTipSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get today's lessons
  app.get("/api/lessons/daily", async (req, res) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const lessons = await storage.getLessonsByDate(today);
      
      if (lessons.length === 0) {
        return res.status(404).json({ 
          message: "Bugun uchun darslar hali yaratilmagan",
          date: today
        });
      }
      
      res.json(lessons);
    } catch (error) {
      console.error("Error fetching daily lessons:", error);
      res.status(500).json({ message: "Xatolik yuz berdi" });
    }
  });

  // Get lesson by ID
  app.get("/api/lessons/:id", async (req, res) => {
    try {
      const lesson = await storage.getLessonById(req.params.id);
      
      if (!lesson) {
        return res.status(404).json({ message: "Dars topilmadi" });
      }
      
      res.json(lesson);
    } catch (error) {
      console.error("Error fetching lesson:", error);
      res.status(500).json({ message: "Xatolik yuz berdi" });
    }
  });

  // Generate new lessons for a specific date
  app.post("/api/lessons/generate", async (req, res) => {
    try {
      const { date } = req.body;
      const targetDate = date || new Date().toISOString().split("T")[0];
      
      const existingLessons = await storage.getLessonsByDate(targetDate);
      if (existingLessons.length > 0) {
        return res.status(400).json({ 
          message: "Bu sana uchun darslar allaqachon mavjud",
          lessons: existingLessons
        });
      }
      
      console.log(`Generating lessons for ${targetDate}...`);
      const newLessons = await generateDailyLessons(targetDate);
      
      const createdLessons = [];
      for (const lesson of newLessons) {
        const created = await storage.createLesson(lesson);
        createdLessons.push(created);
      }
      
      console.log(`Successfully generated ${createdLessons.length} lessons`);
      res.json({ 
        message: "Darslar muvaffaqiyatli yaratildi",
        lessons: createdLessons
      });
    } catch (error) {
      console.error("Error generating lessons:", error);
      res.status(500).json({ message: "Darslar yaratishda xatolik yuz berdi" });
    }
  });

  // Get statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const allLessons = await storage.getAllLessons(100);
      const latestDate = await storage.getLatestLessonDate();
      
      const stats = {
        totalLessons: allLessons.length,
        latestLessonDate: latestDate,
        lessonsToday: allLessons.filter(l => 
          l.lessonDate === new Date().toISOString().split("T")[0]
        ).length,
        difficultyDistribution: {
          oson: allLessons.filter(l => l.difficulty === "oson").length,
          "o'rta": allLessons.filter(l => l.difficulty === "o'rta").length,
          qiyin: allLessons.filter(l => l.difficulty === "qiyin").length,
        }
      };
      
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Xatolik yuz berdi" });
    }
  });

  // Get all lessons (paginated)
  app.get("/api/lessons", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const lessons = await storage.getAllLessons(limit);
      res.json(lessons);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      res.status(500).json({ message: "Xatolik yuz berdi" });
    }
  });

  // Get today's tips
  app.get("/api/tips/daily", async (req, res) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const tips = await storage.getTipsByDate(today);
      
      if (tips.length === 0) {
        return res.status(404).json({ 
          message: "Bugun uchun maslahatlar hali yaratilmagan",
          date: today
        });
      }
      
      res.json(tips);
    } catch (error) {
      console.error("Error fetching daily tips:", error);
      res.status(500).json({ message: "Xatolik yuz berdi" });
    }
  });

  // Get tip by ID
  app.get("/api/tips/:id", async (req, res) => {
    try {
      const tip = await storage.getTipById(req.params.id);
      
      if (!tip) {
        return res.status(404).json({ message: "Maslahat topilmadi" });
      }
      
      res.json(tip);
    } catch (error) {
      console.error("Error fetching tip:", error);
      res.status(500).json({ message: "Xatolik yuz berdi" });
    }
  });

  // Generate new tips for a specific date
  app.post("/api/tips/generate", async (req, res) => {
    try {
      const { date } = req.body;
      const targetDate = date || new Date().toISOString().split("T")[0];
      
      const existingTips = await storage.getTipsByDate(targetDate);
      if (existingTips.length > 0) {
        return res.status(400).json({ 
          message: "Bu sana uchun maslahatlar allaqachon mavjud",
          tips: existingTips
        });
      }
      
      console.log(`Generating tips for ${targetDate}...`);
      const newTips = await generateDailyTips(targetDate);
      
      const createdTips = [];
      for (const tip of newTips) {
        const created = await storage.createTip(tip);
        createdTips.push(created);
      }
      
      console.log(`Successfully generated ${createdTips.length} tips`);
      res.json({ 
        message: "Maslahatlar muvaffaqiyatli yaratildi",
        tips: createdTips
      });
    } catch (error) {
      console.error("Error generating tips:", error);
      res.status(500).json({ message: "Maslahatlar yaratishda xatolik yuz berdi" });
    }
  });

  // Get all tips (paginated)
  app.get("/api/tips", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const tips = await storage.getAllTips(limit);
      res.json(tips);
    } catch (error) {
      console.error("Error fetching tips:", error);
      res.status(500).json({ message: "Xatolik yuz berdi" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
