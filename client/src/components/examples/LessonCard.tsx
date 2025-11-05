import LessonCard from "../LessonCard";
import variablesIcon from "@assets/generated_images/Variables_concept_illustration_5088f7a0.png";

export default function LessonCardExample() {
  return (
    <div className="grid gap-6 p-8 md:grid-cols-2 lg:grid-cols-3">
      <LessonCard
        id={1}
        title="Python nima?"
        description="Python dasturlash tili bilan tanishish. Nima uchun Python o'rganish muhim va qiziqarli ekanligini bilib olamiz."
        difficulty="oson"
        duration="10 daqiqa"
        icon={variablesIcon}
      />
      
      <LessonCard
        id={2}
        title="O'zgaruvchilar"
        description="O'zgaruvchilar yordamida ma'lumotlarni saqlashni o'rganamiz. Quti misoli orqali tushuntiramiz."
        difficulty="oson"
        duration="15 daqiqa"
        icon={variablesIcon}
        completed
      />
      
      <LessonCard
        id={3}
        title="Print funksiyasi"
        description="Ekranga matn va raqamlarni chiqarishni o'rganamiz. Birinchi dasturimizni yozamiz!"
        difficulty="o'rta"
        duration="12 daqiqa"
      />
    </div>
  );
}