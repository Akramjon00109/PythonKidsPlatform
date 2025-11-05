import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DailyDashboard from "@/components/DailyDashboard";
import LessonDetail from "@/components/LessonDetail";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  if (selectedLessonId) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <LessonDetail
            lessonId={selectedLessonId}
            onBack={() => setSelectedLessonId(null)}
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
          <DailyDashboard onLessonSelect={setSelectedLessonId} />
        </section>
      </main>
      <Footer />
    </>
  );
}