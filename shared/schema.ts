import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const lessons = pgTable("lessons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: varchar("difficulty", { length: 20 }).notNull().default("oson"),
  duration: varchar("duration", { length: 50 }).notNull(),
  content: text("content").notNull(),
  codeExample: text("code_example").notNull(),
  exercisePrompt: text("exercise_prompt").notNull(),
  exerciseStarterCode: text("exercise_starter_code"),
  expectedOutput: text("expected_output"),
  lessonNumber: integer("lesson_number").notNull(),
  lessonDate: varchar("lesson_date", { length: 10 }).notNull(),
  iconUrl: text("icon_url"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
  createdAt: true,
});

export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Lesson = typeof lessons.$inferSelect;
