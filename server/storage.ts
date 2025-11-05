import { type User, type InsertUser, type Lesson, type InsertLesson, type Tip, type InsertTip, type Project, type InsertProject, type UserProject, type InsertUserProject, lessons, tips, projects, userProjects } from "@shared/schema";
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
  
  getTipById(id: string): Promise<Tip | undefined>;
  getTipsByDate(date: string): Promise<Tip[]>;
  createTip(tip: InsertTip): Promise<Tip>;
  getAllTips(limit?: number): Promise<Tip[]>;
  getLatestTipDate(): Promise<string | null>;
  
  getProjectById(id: string): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getProjectsByDifficulty(difficulty: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  getUserProject(userId: string, projectId: string): Promise<UserProject | undefined>;
  getUserProjects(userId: string): Promise<UserProject[]>;
  createUserProject(userProject: InsertUserProject): Promise<UserProject>;
  updateUserProject(id: string, updates: Partial<InsertUserProject>): Promise<UserProject>;
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

  async getTipById(id: string): Promise<Tip | undefined> {
    const result = await db.select().from(tips).where(eq(tips.id, id)).limit(1);
    return result[0];
  }

  async getTipsByDate(date: string): Promise<Tip[]> {
    return await db
      .select()
      .from(tips)
      .where(eq(tips.tipDate, date))
      .orderBy(tips.tipNumber);
  }

  async createTip(tip: InsertTip): Promise<Tip> {
    const result = await db.insert(tips).values(tip).returning();
    return result[0];
  }

  async getAllTips(limit: number = 50): Promise<Tip[]> {
    return await db.select().from(tips).orderBy(desc(tips.createdAt)).limit(limit);
  }

  async getLatestTipDate(): Promise<string | null> {
    const result = await db
      .select({ tipDate: tips.tipDate })
      .from(tips)
      .orderBy(desc(tips.tipDate))
      .limit(1);
    return result[0]?.tipDate || null;
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
    return result[0];
  }

  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(projects.difficulty, projects.createdAt);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.category, category))
      .orderBy(projects.difficulty, projects.createdAt);
  }

  async getProjectsByDifficulty(difficulty: string): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.difficulty, difficulty))
      .orderBy(projects.createdAt);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const result = await db.insert(projects).values(project).returning();
    return result[0];
  }

  async getUserProject(userId: string, projectId: string): Promise<UserProject | undefined> {
    const result = await db
      .select()
      .from(userProjects)
      .where(and(eq(userProjects.userId, userId), eq(userProjects.projectId, projectId)))
      .limit(1);
    return result[0];
  }

  async getUserProjects(userId: string): Promise<UserProject[]> {
    return await db
      .select()
      .from(userProjects)
      .where(eq(userProjects.userId, userId))
      .orderBy(desc(userProjects.createdAt));
  }

  async createUserProject(userProject: InsertUserProject): Promise<UserProject> {
    const result = await db.insert(userProjects).values(userProject).returning();
    return result[0];
  }

  async updateUserProject(id: string, updates: Partial<InsertUserProject>): Promise<UserProject> {
    const result = await db
      .update(userProjects)
      .set(updates)
      .where(eq(userProjects.id, id))
      .returning();
    return result[0];
  }
}

export const storage = new DbStorage();
