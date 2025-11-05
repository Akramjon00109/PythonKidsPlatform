import { Telegraf } from "telegraf";
import { storage } from "../storage";
import type { Lesson, Tip } from "@shared/schema";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;

let bot: Telegraf | null = null;

export function initializeTelegramBot() {
  if (!BOT_TOKEN) {
    console.warn("⚠️  TELEGRAM_BOT_TOKEN not set. Telegram bot will not start.");
    return null;
  }

  if (bot) {
    console.log("ℹ️  Telegram bot already initialized");
    return bot;
  }

  try {
    bot = new Telegraf(BOT_TOKEN);

    bot.start((ctx) => {
      ctx.reply(
        "🐍 Salom! Men Python o'qitish botiman.\n\n" +
        "Quyidagi komandalardan foydalaning:\n" +
        "/daily - Bugungi darslar\n" +
        "/lesson <ID> - Dars tafsilotlari\n" +
        "/help - Yordam"
      );
    });

    bot.command("daily", async (ctx) => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const lessons = await storage.getLessonsByDate(today);

        if (lessons.length === 0) {
          await ctx.reply("Bugun uchun darslar hali yaratilmagan.");
          return;
        }

        let message = `📚 Bugungi darslar (${today}):\n\n`;
        lessons.forEach((lesson) => {
          message += `${lesson.lessonNumber}. ${lesson.title}\n`;
          message += `   ${lesson.difficulty} | ${lesson.duration}\n`;
          message += `   ID: ${lesson.id}\n\n`;
        });
        message += "Dars tafsilotlarini ko'rish uchun: /lesson <ID>";

        await ctx.reply(message);
      } catch (error) {
        console.error("Error fetching daily lessons for Telegram:", error);
        await ctx.reply("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      }
    });

    bot.command("lesson", async (ctx) => {
      try {
        const args = ctx.message.text.split(" ");
        if (args.length < 2) {
          await ctx.reply("Iltimos, dars ID sini kiriting.\nMisol: /lesson <ID>");
          return;
        }

        const lessonId = args[1];
        const lesson = await storage.getLessonById(lessonId);

        if (!lesson) {
          await ctx.reply("Dars topilmadi.");
          return;
        }

        const message = formatLessonMessage(lesson);
        await ctx.reply(message, { parse_mode: "Markdown" });
      } catch (error) {
        console.error("Error fetching lesson for Telegram:", error);
        await ctx.reply("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      }
    });

    bot.command("help", (ctx) => {
      ctx.reply(
        "🤖 Python o'qitish boti\n\n" +
        "📋 Komandalar:\n" +
        "/start - Botni ishga tushirish\n" +
        "/daily - Bugungi darslarni ko'rish\n" +
        "/lesson <ID> - Ma'lum bir darsni ko'rish\n" +
        "/help - Ushbu yordam xabari"
      );
    });

    bot.launch();
    console.log("✅ Telegram bot started successfully");
    
    return bot;
  } catch (error) {
    console.error("❌ Failed to start Telegram bot:", error);
    return null;
  }
}

export async function sendDailyLessonsToChannel(lessons: Lesson[]) {
  if (!bot || !CHANNEL_ID) {
    console.warn("⚠️  Telegram bot or channel ID not configured. Skipping channel post.");
    return;
  }

  try {
    const date = lessons[0]?.lessonDate || new Date().toISOString().split("T")[0];
    let message = `📚 Bugungi Python darslari (${date})\n\n`;
    message += `Bugun ${lessons.length} ta yangi dars tayyorladik!\n\n`;

    lessons.forEach((lesson) => {
      message += `${lesson.lessonNumber}. *${lesson.title}*\n`;
      message += `${lesson.description}\n`;
      message += `${lesson.difficulty} | ${lesson.duration}\n\n`;
    });

    message += "🌐 Barcha darslarni ko'rish va mashq qilish uchun web ilovamizga tashrif buyuring!";

    await bot.telegram.sendMessage(CHANNEL_ID, message, { parse_mode: "Markdown" });
    console.log(`✅ Daily lessons posted to Telegram channel ${CHANNEL_ID}`);
  } catch (error) {
    console.error("❌ Failed to post to Telegram channel:", error);
  }
}

export async function sendLessonToChannel(lesson: Lesson) {
  if (!bot || !CHANNEL_ID) {
    console.warn("⚠️  Telegram bot or channel ID not configured. Skipping channel post.");
    return;
  }

  try {
    let message = `📖 *Dars ${lesson.lessonNumber}: ${lesson.title}*\n\n`;
    message += `${lesson.description}\n\n`;
    message += `⭐ Qiyinlik: ${lesson.difficulty}\n`;
    message += `⏱ Davomiyligi: ${lesson.duration}\n\n`;
    message += `📝 Dars mazmuni:\n${lesson.content}\n\n`;
    message += `💻 Kod misoli:\n\`\`\`python\n${lesson.codeExample}\n\`\`\`\n\n`;
    message += `✏️ Mashq: ${lesson.exercisePrompt}\n\n`;
    message += `🌐 Mashqlarni bajarish uchun web ilovamizga tashrif buyuring!`;

    await bot.telegram.sendMessage(CHANNEL_ID, message, { parse_mode: "Markdown" });
    console.log(`✅ Lesson ${lesson.lessonNumber} posted to Telegram channel`);
  } catch (error) {
    console.error(`❌ Failed to post lesson ${lesson.lessonNumber} to channel:`, error);
  }
}

export async function sendTipToChannel(tip: Tip) {
  if (!bot || !CHANNEL_ID) {
    console.warn("⚠️  Telegram bot or channel ID not configured. Skipping channel post.");
    return;
  }

  try {
    let message = `💡 *Maslahat ${tip.tipNumber}: ${tip.title}*\n\n`;
    message += `${tip.content}\n\n`;
    message += `📂 Kategoriya: ${tip.category}\n\n`;
    message += `🌐 Ko'proq maslahatlar uchun web ilovamizga tashrif buyuring!`;

    await bot.telegram.sendMessage(CHANNEL_ID, message, { parse_mode: "Markdown" });
    console.log(`✅ Tip ${tip.tipNumber} posted to Telegram channel`);
  } catch (error) {
    console.error(`❌ Failed to post tip ${tip.tipNumber} to channel:`, error);
  }
}

function formatLessonMessage(lesson: Lesson): string {
  let message = `📖 *${lesson.title}*\n\n`;
  message += `${lesson.description}\n\n`;
  message += `⭐ Qiyinlik: ${lesson.difficulty}\n`;
  message += `⏱ Davomiyligi: ${lesson.duration}\n\n`;
  message += `📝 Dars mazmuni:\n${lesson.content}\n\n`;
  message += `💻 Kod misoli:\n\`\`\`python\n${lesson.codeExample}\n\`\`\`\n\n`;
  message += `✏️ Mashq: ${lesson.exercisePrompt}`;
  
  return message;
}

export function stopTelegramBot() {
  if (bot) {
    bot.stop();
    console.log("🛑 Telegram bot stopped");
  }
}
