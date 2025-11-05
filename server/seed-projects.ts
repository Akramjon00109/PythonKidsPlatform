import { storage } from "./storage";
import type { InsertProject } from "@shared/schema";

const sampleProjects: InsertProject[] = [
  {
    title: "Son topish o'yini",
    description: "Kompyuter tasodifiy son o'ylaydi, siz uni topishingiz kerak. Har bir urinishdan keyin kompyuter yordam beradi.",
    difficulty: "oson",
    duration: "30-45 daqiqa",
    category: "o'yin",
    objective: "Tasodifiy sonlar, while sikli, if/else shartlari va foydalanuvchi inputini qabul qilish bilan ishlashni o'rganish.",
    steps: [
      "1. random moduli va randint funksiyasini import qiling\n2. 1 dan 100 gacha tasodifiy son yarating\n3. Foydalanuvchidan son kiritishni so'rang",
      "4. while tsikli yarating - foydalanuvchi to'g'ri javobni topmaguncha davom etadi\n5. Foydalanuvchi kiritgan sonni int() ga aylantiring",
      "6. If/elif/else yordamida kiritilgan son katta, kichik yoki to'g'ri ekanligini tekshiring",
      "7. To'g'ri javob topilganda tabriklovchi xabar va necha urinish ketganini ko'rsating\n8. O'yinni yangilash uchun qayta boshlash imkoniyatini qo'shing"
    ],
    starterCode: `# Son topish o'yini
from random import randint

print("Son topish o'yiniga xush kelibsiz!")
print("Men 1 dan 100 gacha son o'yladim. Toping!")

# Bu yerdan boshlang
`,
    solutionCode: `# Son topish o'yini
from random import randint

print("Son topish o'yiniga xush kelibsiz!")
print("Men 1 dan 100 gacha son o'yladim. Toping!")

random_number = randint(1, 100)
attempts = 0
found = False

while not found:
    guess = int(input("Sizning taxminingiz: "))
    attempts += 1
    
    if guess < random_number:
        print("Kichik! Kattaroq son kiriting.")
    elif guess > random_number:
        print("Katta! Kichikroq son kiriting.")
    else:
        found = True
        print(f"Tabriklaymiz! Siz {attempts} urinishda topdingiz!")
        print(f"To'g'ri javob: {random_number}")`,
    hints: [
      "random modulidan randint funksiyasini import qilish kerak",
      "while True yoki while not found ishlatishingiz mumkin",
      "Foydalanuvchi inputini int() ga aylantirish esdan chiqmasin",
      "Urinishlar sonini hisoblab borish uchun attempts = 0 yarating"
    ],
    requirements: [
      "1 dan 100 gacha tasodifiy son yaratish",
      "Foydalanuvchidan son kiritishni so'rash",
      "Katta/kichik ko'rsatma berish",
      "To'g'ri javobda tabriklovchi xabar va urinishlar sonini ko'rsatish"
    ],
    tags: ["random", "while", "if/else", "input", "o'yin"],
    iconUrl: null,
  },
  {
    title: "Oddiy kalkulyator",
    description: "Ikki son ustida to'rt arifmetik amal (+, -, *, /) bajara oladigan kalkulyator yarating.",
    difficulty: "oson",
    duration: "20-30 daqiqa",
    category: "kalkulyator",
    objective: "Foydalanuvchi inputi, funksiyalar, if/elif/else shartlari va arifmetik amallar bilan ishlashni o'rganish.",
    steps: [
      "1. Kalkulyator uchun funksi yasimages'",
      "2. Foydalanuvchidan birinchi sonni kiriting so'rang\n3. Foydalanuvchidan ikkinchi sonni kiriting so'rang",
      "4. Foydalanuvchidan qaysi amalni bajarishni so'rang (+, -, *, /)",
      "5. If/elif/else yordamida tanlangan amalni bajaring",
      "6. Nolga bo'lish xatoligini tekshiring (/ uchun)\n7. Natijani ko'rsating",
      "8. Yana hisoblash yoki chiqish variantini qo'shing"
    ],
    starterCode: `# Oddiy kalkulyator
print("Kalkulyatorga xush kelibsiz!")

# Bu yerdan boshlang
`,
    solutionCode: `# Oddiy kalkulyator
def calculator():
    print("Kalkulyatorga xush kelibsiz!")
    print("Amallar: + (qo'shish), - (ayirish), * (ko'paytirish), / (bo'lish)")
    
    num1 = float(input("Birinchi sonni kiriting: "))
    num2 = float(input("Ikkinchi sonni kiriting: "))
    operation = input("Amalni tanlang (+, -, *, /): ")
    
    if operation == "+":
        result = num1 + num2
        print(f"Natija: {num1} + {num2} = {result}")
    elif operation == "-":
        result = num1 - num2
        print(f"Natija: {num1} - {num2} = {result}")
    elif operation == "*":
        result = num1 * num2
        print(f"Natija: {num1} * {num2} = {result}")
    elif operation == "/":
        if num2 != 0:
            result = num1 / num2
            print(f"Natija: {num1} / {num2} = {result}")
        else:
            print("Xatolik: Nolga bo'lish mumkin emas!")
    else:
        print("Noto'g'ri amal!")

calculator()`,
    hints: [
      "float() dan foydalaning - kasr sonlar bilan ham ishlash uchun",
      "Nolga bo'lish xatoligini tekshiring",
      "F-string formatdan foydalanib chiroyli natija ko'rsating"
    ],
    requirements: [
      "Ikki sonni qabul qilish",
      "To'rt arifmetik amal bajarish",
      "Nolga bo'lish xatoligini tekshirish",
      "Natijani chiroyli formatda ko'rsatish"
    ],
    tags: ["arifmetika", "funksiya", "if/else", "input"],
    iconUrl: null,
  },
  {
    title: "Parol yaratuvchi",
    description: "Tasodifiy va xavfsiz parol yaratadigan dastur yozing. Foydalanuvchi parol uzunligini belgilaydi.",
    difficulty: "o'rta",
    duration: "45-60 daqiqa",
    category: "amaliy",
    objective: "Random modulasi, string metodlari, list comprehension va funksiyalar bilan ishlashni o'rganish.",
    steps: [
      "1. import random va string modullarini\n2. Parol uchun ishlatiladigan belgilarni aniqlang (harflar, raqamlar, maxsus belgilar)",
      "3. Foydalanuvchidan parol uzunligini so'rang\n4. Uzunlik kamida 8 ta belgidan iborat bo'lishini tekshiring",
      "5. random.choice() yordamida tasodifiy belgilar tanlang",
      "6. List comprehension yoki for loop bilan parol yarating\n7. Yaratilgan parolni ko'rsating",
      "8. Parolning kuchlilik darajasini ko'rsating (kuchli/o'rta/zaif)"
    ],
    starterCode: `# Parol yaratuvchi
import random
import string

print("Xavfsiz parol yaratish dasturi")

# Bu yerdan boshlang
`,
    solutionCode: `# Parol yaratuvchi
import random
import string

def generate_password(length):
    # Barcha mumkin bo'lgan belgilar
    lowercase = string.ascii_lowercase
    uppercase = string.ascii_uppercase
    digits = string.digits
    special = string.punctuation
    
    all_characters = lowercase + uppercase + digits + special
    
    # Kamida bittadan har bir turdan bo'lishini ta'minlash
    password = [
        random.choice(lowercase),
        random.choice(uppercase),
        random.choice(digits),
        random.choice(special)
    ]
    
    # Qolgan belgilarni to'ldirish
    password += [random.choice(all_characters) for _ in range(length - 4)]
    
    # Aralashтirish
    random.shuffle(password)
    
    return ''.join(password)

def check_strength(length):
    if length >= 12:
        return "Juda kuchli 💪"
    elif length >= 8:
        return "Kuchli ✅"
    else:
        return "Zaif ⚠️"

print("Xavfsiz parol yaratish dasturi")
length = int(input("Parol uzunligi (kamida 8): "))

if length < 8:
    print("Parol kamida 8 ta belgidan iborat bo'lishi kerak!")
else:
    password = generate_password(length)
    strength = check_strength(length)
    print(f"\\nYaratilgan parol: {password}")
    print(f"Kuchlilik: {strength}")`,
    hints: [
      "string moduli tayyor belgilar to'plamlarini beradi: ascii_lowercase, ascii_uppercase, digits, punctuation",
      "List comprehension: [random.choice(chars) for _ in range(n)]",
      "random.shuffle() list elementlarini aralshtiradi",
      "''.join(list) list elementlarini birlashtirib string qiladi"
    ],
    requirements: [
      "Kamida 8 belgidan iborat parol yaratish",
      "Kichik harflar, katta harflar, raqamlar va maxsus belgilarni qo'shish",
      "Parolni tasodifiy tartibda yaratish",
      "Parol kuchliligini baholash va ko'rsatish"
    ],
    tags: ["random", "string", "list comprehension", "funksiya", "amaliy"],
    iconUrl: null,
  },
  {
    title: "Tosh-Qaychi-Qog'oz o'yini",
    description: "Klassik Tosh-Qaychi-Qog'oz o'yinini yarating. Kompyuter tasodifiy tanlov qiladi, siz g'olibni aniqlaysiz.",
    difficulty: "oson",
    duration: "35-45 daqiqa",
    category: "o'yin",
    objective: "Random tanlov, if/elif/else shartlari, while tsikli va mantiqiy operatsiyalar bilan ishlashni o'rganish.",
    steps: [
      "1. random modulini import qiling\n2. O'yin qoidalarini tushuntiring",
      "3. Tanlovlar ro'yxatini yarating: ['tosh', 'qaychi', 'qog'oz']",
      "4. While tsikli ichida o'yinni davom ettiring\n5. Foydalanuvchidan tanlov so'rang",
      "6. Kompyuter uchun tasodifiy tanlov qiling (random.choice)",
      "7. G'olibni aniqlash uchun if/elif/else shartlarini yozing\n8. Natijani ko'rsating va yana o'ynashni taklif qiling",
      "9. Umumiy statistikani (yutish/yutqazish/durang) saqlab boring"
    ],
    starterCode: `# Tosh-Qaychi-Qog'oz o'yini
import random

print("Tosh-Qaychi-Qog'oz o'yiniga xush kelibsiz!")
print("Qoidalar: Tosh qayчini yengadi, Qaychi qog'ozni yengadi, Qog'oz toshni yengadi")

# Bu yerdan boshlang
`,
    solutionCode: `# Tosh-Qaychi-Qog'oz o'yini
import random

def determine_winner(player, computer):
    if player == computer:
        return "durang"
    
    win_conditions = {
        "tosh": "qaychi",
        "qaychi": "qog'oz",
        "qog'oz": "tosh"
    }
    
    if win_conditions[player] == computer:
        return "yutdingiz"
    else:
        return "yutqazdingiz"

print("Tosh-Qaychi-Qog'oz o'yiniga xush kelibsiz!")
print("Qoidalar: Tosh qayчini yengadi, Qaychi qog'ozni yengadi, Qog'oz toshni yengadi\\n")

choices = ["tosh", "qaychi", "qog'oz"]
wins = 0
losses = 0
draws = 0

while True:
    player_choice = input("Tanlovingiz (tosh/qaychi/qog'oz) yoki 'chiqish': ").lower()
    
    if player_choice == "chiqish":
        break
    
    if player_choice not in choices:
        print("Noto'g'ri tanlov! Qaytadan urinib ko'ring.\\n")
        continue
    
    computer_choice = random.choice(choices)
    print(f"Kompyuter: {computer_choice}")
    print(f"Siz: {player_choice}")
    
    result = determine_winner(player_choice, computer_choice)
    
    if result == "yutdingiz":
        print("🎉 Siz yutdingiz!\\n")
        wins += 1
    elif result == "yutqazdingiz":
        print("😞 Siz yutqazdingiz!\\n")
        losses += 1
    else:
        print("🤝 Durang!\\n")
        draws += 1

print(f"\\nJami natijalar:")
print(f"Yutishlar: {wins}")
print(f"Yutqazishlar: {losses}")
print(f"Duranglar: {draws}")`,
    hints: [
      "Dictionary ishlatib g'olibni aniqlash oson: {'tosh': 'qaychi', ...}",
      "Statistika uchun alohida o'zgaruvchilar yarating",
      "lower() metodidan foydalaning - katta/kichik harf farqini yo'qotish uchun"
    ],
    requirements: [
      "Foydalanuvchi va kompyuter tanlovi",
      "G'olibni to'g'ri aniqlash",
      "Statistikani saqlash va ko'rsatish",
      "O'yinni qayta boshlash yoki chiqish imkoniyati"
    ],
    tags: ["random", "o'yin", "dictionary", "while", "mantiq"],
    iconUrl: null,
  },
  {
    title: "To-Do List dasturi",
    description: "Oddiy vazifalar ro'yxatini boshqarish dasturini yarating. Vazifa qo'shish, o'chirish va ko'rish imkoniyatlari bo'lsin.",
    difficulty: "o'rta",
    duration: "50-70 daqiqa",
    category: "amaliy",
    objective: "List metodlari, while tsikli, funksiyalar va menyu tizimi bilan ishlashni o'rganish.",
    steps: [
      "1. Bo'sh vazifalar ro'yxatini yarating (list)\n2. Menyu ko'rsatadigan funksiya yarating",
      "3. Vazifa qo'shadigan add_task() funksiyasini yozing",
      "4. Barcha vazifalarni ko'rsatadigan show_tasks() funksiyasini yozing\n5. Vazifani o'chiradigan remove_task() funksiyasini yozing",
      "6. While tsikli ichida menyu tizimini yarating\n7. Foydalanuvchi tanloviga qarab tegishli funksiyani chaqiring",
      "8. 'Bajarildi' deb belgilash funksiyasini qo'shing (bonus)"
    ],
    starterCode: `# To-Do List dasturi
print("To-Do List dasturiga xush kelibsiz!")

tasks = []

# Bu yerdan boshlang
`,
    solutionCode: `# To-Do List dasturi
def show_menu():
    print("\\n=== To-Do List ===")
    print("1. Vazifa qo'shish")
    print("2. Vazifalarni ko'rish")
    print("3. Vazifa o'chirish")
    print("4. Vazifani bajarildi deb belgilash")
    print("5. Chiqish")

def add_task(tasks):
    task = input("Yangi vazifa: ")
    tasks.append({"task": task, "completed": False})
    print(f"✅ '{task}' qo'shildi!")

def show_tasks(tasks):
    if not tasks:
        print("\\nVazifalar ro'yxati bo'sh")
        return
    
    print("\\n=== Vazifalar ro'yxati ===")
    for i, task in enumerate(tasks, 1):
        status = "✓" if task["completed"] else "○"
        print(f"{i}. [{status}] {task['task']}")

def remove_task(tasks):
    show_tasks(tasks)
    if not tasks:
        return
    
    try:
        index = int(input("\\nO'chirish uchun raqamni kiriting: ")) - 1
        if 0 <= index < len(tasks):
            removed = tasks.pop(index)
            print(f"🗑️ '{removed['task']}' o'chirildi!")
        else:
            print("Noto'g'ri raqam!")
    except ValueError:
        print("Iltimos, raqam kiriting!")

def complete_task(tasks):
    show_tasks(tasks)
    if not tasks:
        return
    
    try:
        index = int(input("\\nBajarilgan vazifa raqami: ")) - 1
        if 0 <= index < len(tasks):
            tasks[index]["completed"] = True
            print(f"✓ '{tasks[index]['task']}' bajarildi!")
        else:
            print("Noto'g'ri raqam!")
    except ValueError:
        print("Iltimos, raqam kiriting!")

print("To-Do List dasturiga xush kelibsiz!")
tasks = []

while True:
    show_menu()
    choice = input("\\nTanlovingiz: ")
    
    if choice == "1":
        add_task(tasks)
    elif choice == "2":
        show_tasks(tasks)
    elif choice == "3":
        remove_task(tasks)
    elif choice == "4":
        complete_task(tasks)
    elif choice == "5":
        print("Xayr!")
        break
    else:
        print("Noto'g'ri tanlov!")`,
    hints: [
      "Dictionary ishlatib vazifa va uning statusini saqlang: {'task': '...', 'completed': False}",
      "enumerate() dan foydalanib list elementlariga raqam bering",
      "try/except bilan xatoliklarni ushlang",
      "list.pop(index) elementni o'chiradi va qaytaradi"
    ],
    requirements: [
      "Vazifa qo'shish funksiyasi",
      "Barcha vazifalarni ko'rsatish",
      "Vazifa o'chirish (index bo'yicha)",
      "Vazifani bajarildi deb belgilash",
      "Menyu tizimi va while tsikli"
    ],
    tags: ["list", "dictionary", "funksiya", "while", "menu", "amaliy"],
    iconUrl: null,
  }
];

export async function seedProjects() {
  console.log("🌱 Seeding projects...");
  
  try {
    const existingProjects = await storage.getAllProjects();
    
    if (existingProjects.length > 0) {
      console.log(`ℹ️  ${existingProjects.length} loyihalar allaqachon mavjud. Seed o'tkazib yuborildi.`);
      return;
    }
    
    for (const project of sampleProjects) {
      await storage.createProject(project);
      console.log(`✅ Created project: ${project.title}`);
    }
    
    console.log(`🎉 ${sampleProjects.length} ta loyiha muvaffaqiyatli yaratildi!`);
  } catch (error) {
    console.error("❌ Error seeding projects:", error);
    throw error;
  }
}
