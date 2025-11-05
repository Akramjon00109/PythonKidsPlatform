import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DailyDashboard from "@/components/DailyDashboard";
import LessonDetail from "@/components/LessonDetail";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  if (selectedLesson) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <LessonDetail
            lessonNumber={selectedLesson}
            title="O'zgaruvchilar"
            difficulty="oson"
            duration="15 daqiqa"
            onBack={() => setSelectedLesson(null)}
          />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="container mx-auto px-4 py-12 md:py-16">
          <DailyDashboard />
        </section>
      </main>
      <Footer />
    </>
  );
}