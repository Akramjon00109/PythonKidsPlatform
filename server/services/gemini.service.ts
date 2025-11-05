import { GoogleGenAI } from "@google/genai";
import type { InsertLesson } from "@shared/schema";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY must be set");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface LessonTopic {
  title: string;
  description: string;
  difficulty: "oson" | "o'rta" | "qiyin";
  duration: string;
}

const LESSON_TOPICS: LessonTopic[] = [
  { title: "Python nima?", description: "Python dasturlash tili bilan tanishish", difficulty: "oson", duration: "10 daqiqa" },
  { title: "O'zgaruvchilar", description: "Ma'lumotlarni saqlash", difficulty: "oson", duration: "15 daqiqa" },
  { title: "Print funksiyasi", description: "Ekranga ma'lumot chiqarish", difficulty: "oson", duration: "12 daqiqa" },
  { title: "Raqamlar va matematika", description: "Hisob-kitoblar qilish", difficulty: "o'rta", duration: "18 daqiqa" },
  { title: "Kiritish va chiqarish", description: "Foydalanuvchi bilan ishlash", difficulty: "o'rta", duration: "20 daqiqa" },
  { title: "Shartli operatorlar - If", description: "Qarorlar qabul qilish", difficulty: "o'rta", duration: "20 daqiqa" },
  { title: "Else va Elif", description: "Murakkab shartlar", difficulty: "o'rta", duration: "22 daqiqa" },
  { title: "Mantiqiy amallar", description: "And, Or, Not operatorlari", difficulty: "o'rta", duration: "18 daqiqa" },
  { title: "Ro'yxatlar (Lists)", description: "Ko'p ma'lumotlarni saqlash", difficulty: "o'rta", duration: "25 daqiqa" },
  { title: "For tsikli", description: "Takrorlash", difficulty: "qiyin", duration: "25 daqiqa" },
];

export async function generateLesson(
  topic: LessonTopic,
  lessonNumber: number,
  date: string
): Promise<InsertLesson> {
  const prompt = `10+ yoshdagi bolalar uchun Python darsi yarating. Dars O'zbek tilida bo'lishi kerak.

Mavzu: ${topic.title}
Qisqacha tavsif: ${topic.description}
Qiyinlik darajasi: ${topic.difficulty}

Quyidagi formatda javob bering (JSON):
{
  "content": "Darsning to'liq mazmuni. Sodda tilda tushuntiring. 3-4 paragrafdan iborat bo'lsin.",
  "codeExample": "Python kod misoli. Izohlar bilan. 5-10 qator.",
  "exercisePrompt": "Mashq topshirig'i. O'quvchi nima qilishi kerakligini aniq yozing.",
  "exerciseStarterCode": "Boshlang'ich kod. O'quvchi bu kodni to'ldirib tugallaydi.",
  "expectedOutput": "Kutilayotgan natija"
}

MUHIM: 
- Juda sodda va tushunarli tilda yozing
- Bolalar uchun qiziqarli misollar ishlatiling
- Kod misollariga O'zbekcha izohlar qo'shing
- Mashq oson va qiziqarli bo'lsin`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json",
      },
      contents: prompt,
    });

    const result = response.text;
    if (!result) {
      throw new Error("Empty response from Gemini");
    }

    const lessonData = JSON.parse(result);

    return {
      title: topic.title,
      description: topic.description,
      difficulty: topic.difficulty,
      duration: topic.duration,
      content: lessonData.content,
      codeExample: lessonData.codeExample,
      exercisePrompt: lessonData.exercisePrompt,
      exerciseStarterCode: lessonData.exerciseStarterCode || "",
      expectedOutput: lessonData.expectedOutput || "",
      lessonNumber,
      lessonDate: date,
      iconUrl: null,
    };
  } catch (error) {
    console.error("Error generating lesson:", error);
    throw error;
  }
}

export async function generateDailyLessons(date: string): Promise<InsertLesson[]> {
  const lessons: InsertLesson[] = [];
  const startIndex = Math.floor(Math.random() * (LESSON_TOPICS.length - 5));
  
  for (let i = 0; i < 5; i++) {
    const topic = LESSON_TOPICS[(startIndex + i) % LESSON_TOPICS.length];
    const lesson = await generateLesson(topic, i + 1, date);
    lessons.push(lesson);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return lessons;
}