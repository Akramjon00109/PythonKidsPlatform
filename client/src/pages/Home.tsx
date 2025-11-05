import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DailyDashboard from "@/components/DailyDashboard";
import LessonDetail from "@/components/LessonDetail";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetail from "@/components/ProjectDetail";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [view, setView] = useState<"home" | "projects">("home");

  const userId = "demo-user";

  const handleViewChange = (newView: "home" | "projects") => {
    setView(newView);
    setSelectedLessonId(null);
    setSelectedProjectId(null);
  };

  if (selectedProjectId) {
    return (
      <>
        <Header onNavigate={handleViewChange} currentView={view} />
        <main className="container mx-auto px-4 py-8">
          <ProjectDetail
            projectId={selectedProjectId}
            userId={userId}
            onBack={() => setSelectedProjectId(null)}
          />
        </main>
        <Footer />
      </>
    );
  }

  if (selectedLessonId) {
    return (
      <>
        <Header onNavigate={handleViewChange} currentView={view} />
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

  if (view === "projects") {
    return (
      <>
        <Header onNavigate={handleViewChange} currentView={view} />
        <main className="container mx-auto px-4">
          <ProjectsPage onProjectSelect={setSelectedProjectId} />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header onNavigate={handleViewChange} currentView={view} />
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