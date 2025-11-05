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

export const tips = pgTable("tips", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 50 }).notNull().default("general"),
  tipNumber: integer("tip_number").notNull(),
  tipDate: varchar("tip_date", { length: 10 }).notNull(),
  iconUrl: text("icon_url"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertTipSchema = createInsertSchema(tips).omit({
  id: true,
  createdAt: true,
});

export type InsertTip = z.infer<typeof insertTipSchema>;
export type Tip = typeof tips.$inferSelect;

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: varchar("difficulty", { length: 20 }).notNull().default("oson"),
  duration: varchar("duration", { length: 50 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  objective: text("objective").notNull(),
  steps: text("steps").array().notNull(),
  starterCode: text("starter_code").notNull(),
  solutionCode: text("solution_code").notNull(),
  hints: text("hints").array(),
  requirements: text("requirements").array().notNull(),
  tags: text("tags").array(),
  iconUrl: text("icon_url"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export const userProjects = pgTable("user_projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  projectId: varchar("project_id").notNull().references(() => projects.id),
  status: varchar("status", { length: 20 }).notNull().default("started"),
  completedSteps: integer("completed_steps").array().notNull().default(sql`ARRAY[]::integer[]`),
  userCode: text("user_code"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertUserProjectSchema = createInsertSchema(userProjects).omit({
  id: true,
  createdAt: true,
});

export type InsertUserProject = z.infer<typeof insertUserProjectSchema>;
export type UserProject = typeof userProjects.$inferSelect;
