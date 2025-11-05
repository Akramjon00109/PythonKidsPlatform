import { GoogleGenAI } from "@google/genai";
import type { InsertTip } from "@shared/schema";

let ai: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is not set. Please add your Gemini API key to use AI-powered tip generation.");
  }
  
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  
  return ai;
}

export interface TipTopic {
  title: string;
  category: string;
}

const TIP_TOPICS: TipTopic[] = [
  { title: "Har kuni kod yozing", category: "motivatsiya" },
  { title: "Kodni o'qish muhim", category: "o'rganish" },
  { title: "Xatolardan qo'rqmang", category: "motivatsiya" },
  { title: "Loyihalar yarating", category: "amaliyot" },
  { title: "Stackoverflow dan foydalaning", category: "manba" },
  { title: "GitHub'da profil yarating", category: "amaliyot" },
  { title: "Dokumentatsiyani o'qing", category: "o'rganish" },
  { title: "Debugger'dan foydalaning", category: "texnik" },
  { title: "Kod yozishdan oldin rejalashtiring", category: "o'rganish" },
  { title: "Google qilishni o'rganing", category: "ko'nikma" },
  { title: "Izohlar yozing", category: "texnik" },
  { title: "O'zingizni boshqalar bilan solishtirmang", category: "motivatsiya" },
  { title: "Sabr qiling", category: "motivatsiya" },
  { title: "Jamoa bilan ishlashni o'rganing", category: "ko'nikma" },
  { title: "Versiya nazorati (Git)", category: "texnik" },
  { title: "Qadam-baqadam o'rganing", category: "o'rganish" },
  { title: "Mashq qiling", category: "amaliyot" },
  { title: "Yangi texnologiyalarni sinab ko'ring", category: "amaliyot" },
  { title: "Algoritmlarni o'rganing", category: "o'rganish" },
  { title: "Odamlar bilan tarmoq quring", category: "ko'nikma" },
];

export async function generateTip(
  topic: TipTopic,
  tipNumber: number,
  date: string
): Promise<InsertTip> {
  const prompt = `Dasturlashni 0 dan boshlayotgan yangi boshlovchilar uchun foydali maslahat yarating. Maslahat O'zbek tilida bo'lishi kerak.

Mavzu: ${topic.title}
Kategoriya: ${topic.category}

Quyidagi formatda javob bering (JSON):
{
  "title": "Maslahat sarlavhasi (qisqa va tushunarli)",
  "content": "Maslahatning to'liq mazmuni. Sodda va tushunarli tilda yozing. 2-3 paragrafdan iborat bo'lsin. Amaliy misollar va maslahatlar bering. Yangi boshlovchilar uchun motivatsiya va yo'l-yo'riq bo'lsin."
}

MUHIM: 
- Juda sodda va tushunarli tilda yozing
- Yangi boshlovchilar uchun qiziqarli va foydali bo'lsin
- Motivatsiya bering
- Amaliy maslahatlar bering
- Qisqa va aniq yozing`;

  try {
    const genai = getAI();
    const response = await genai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            title: { type: "string" },
            content: { type: "string" },
          },
          required: ["title", "content"],
        },
      },
      contents: prompt,
    });

    const result = response.text;
    if (!result) {
      throw new Error("Empty response from Gemini");
    }

    const tipData = JSON.parse(result);

    return {
      title: tipData.title,
      content: tipData.content,
      category: topic.category,
      tipNumber,
      tipDate: date,
      iconUrl: null,
    };
  } catch (error) {
    console.error("Error generating tip:", error);
    throw error;
  }
}

export async function generateDailyTips(date: string): Promise<InsertTip[]> {
  const tips: InsertTip[] = [];
  const startIndex = Math.floor(Math.random() * (TIP_TOPICS.length - 5));
  
  for (let i = 0; i < 5; i++) {
    const topic = TIP_TOPICS[(startIndex + i) % TIP_TOPICS.length];
    const tip = await generateTip(topic, i + 1, date);
    tips.push(tip);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return tips;
}
