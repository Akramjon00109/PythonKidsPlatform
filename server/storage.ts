import { type User, type InsertUser, type Lesson, type InsertLesson, lessons } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getLessonById(id: string): Promise<Lesson | undefined>;
  getLessonsByDate(date: string): Promise<Lesson[]>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  getAllLessons(limit?: number): Promise<Lesson[]>;
  getLatestLessonDate(): Promise<string | null>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    throw new Error("Not implemented");
  }

  async getLessonById(id: string): Promise<Lesson | undefined> {
    const result = await db.select().from(lessons).where(eq(lessons.id, id)).limit(1);
    return result[0];
  }

  async getLessonsByDate(date: string): Promise<Lesson[]> {
    return await db
      .select()
      .from(lessons)
      .where(eq(lessons.lessonDate, date))
      .orderBy(lessons.lessonNumber);
  }

  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const result = await db.insert(lessons).values(lesson).returning();
    return result[0];
  }

  async getAllLessons(limit: number = 50): Promise<Lesson[]> {
    return await db.select().from(lessons).orderBy(desc(lessons.createdAt)).limit(limit);
  }

  async getLatestLessonDate(): Promise<string | null> {
    const result = await db
      .select({ lessonDate: lessons.lessonDate })
      .from(lessons)
      .orderBy(desc(lessons.lessonDate))
      .limit(1);
    return result[0]?.lessonDate || null;
  }
}

export const storage = new DbStorage();
