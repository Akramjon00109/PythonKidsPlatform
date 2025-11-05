import ExerciseZone from "../ExerciseZone";

export default function ExerciseZoneExample() {
  return (
    <div className="p-8">
      <ExerciseZone
        title="O'zingiz sinab ko'ring!"
        instructions='Print funksiyasidan foydalanib, "Salom, Python!" deb ekranga chiqaring.'
        initialCode='# Bu yerda kod yozing\nprint("Salom, Python!")'
        expectedOutput="Salom, Python!"
      />
    </div>
  );
}