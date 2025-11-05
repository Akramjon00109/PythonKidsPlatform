# Python Learning Platform Design Guidelines

## Design Approach
**Reference-Based Hybrid Approach**: Drawing inspiration from Duolingo's gamified learning experience + Khan Academy's educational clarity + Scratch's playful coding environment, adapted for 10+ year old Python learners.

**Core Principles**:
- Playful yet structured learning environment
- Visual hierarchy that guides attention to learning content
- Generous whitespace to reduce cognitive load
- Engaging without overwhelming young learners

---

## Typography

**Font Families**:
- Primary: Inter or Nunito (Google Fonts) - clean, friendly, highly readable
- Code: JetBrains Mono or Fira Code - clear monospace for code blocks

**Hierarchy**:
- Hero/Page Titles: text-4xl to text-5xl, font-bold
- Section Headers: text-2xl to text-3xl, font-semibold
- Lesson Titles: text-xl, font-semibold
- Body Text: text-base to text-lg (larger for young readers)
- Code Snippets: text-sm to text-base
- Captions/Meta: text-sm

---

## Layout System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16
- Component padding: p-4 to p-6
- Section spacing: py-12 to py-16
- Card gaps: gap-6 to gap-8
- Container margins: mx-4 to mx-8

**Breakpoints**:
- Mobile-first approach (10+ year olds use tablets/phones)
- Single column on mobile
- 2-column layouts on tablet (md:)
- Max 3-column grids on desktop (lg:)

**Containers**:
- Main content: max-w-6xl mx-auto
- Lesson content: max-w-4xl (optimal reading width for children)
- Full-width sections: w-full with inner constraints

---

## Component Library

### Navigation
- Top navigation bar with logo, main sections, and user greeting
- Sticky header (sticky top-0) for consistent access
- Mobile: Hamburger menu with slide-out drawer
- Include lesson progress indicator in header

### Hero Section
- Playful illustration or animated graphic showing kids coding
- Large, welcoming headline: "Har kuni Python o'rganamiz!" 
- Quick stats: Today's lessons count, streak counter, total learners
- Primary CTA: "Bugungi darslarni boshlash"
- Height: 60-70vh on desktop, auto on mobile

### Lesson Cards (Primary Component)
- Card-based design with rounded corners (rounded-xl)
- Each card contains:
  - Lesson number badge (top-left)
  - Lesson title (prominent)
  - Brief description (2-3 lines)
  - Difficulty indicator (visual dots/stars)
  - Duration estimate
  - "Boshla" button
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Hover state: Subtle lift effect (transform translate-y-[-4px])

### Code Display Components
- Code blocks with syntax highlighting
- Copy button (top-right corner)
- Line numbers for longer examples
- Rounded corners (rounded-lg)
- Generous padding (p-6)
- Examples should feel embedded, not floating

### Interactive Exercise Zone
- Dedicated section within each lesson
- "Try it yourself" prompt
- Input area for code (textarea or integrated editor)
- "Run Code" button (prominent, playful)
- Output display area below
- Success/error feedback with friendly icons

### Daily Dashboard
- Hero section with today's date and motivational message
- 5 lesson cards in grid layout
- Progress tracker showing completed vs remaining
- "Yesterday's lessons" section (collapsed by default)
- Quick navigation to previous weeks

### Lesson Detail View
- Full-width hero with lesson title and number
- Content sections with clear hierarchy:
  - "Nimani o'rganamiz?" (What we'll learn)
  - Theory explanation with examples
  - Code demonstration
  - Interactive exercise
  - Quiz/Question section
  - "Keyingisi" (Next lesson) CTA
- Sidebar (on desktop): Table of contents, progress, help

### Support Components
- Achievement badges (circular, vibrant)
- Progress bars (rounded, animated)
- Tooltip hints (rounded-lg, subtle shadow)
- Loading states (playful animations, NOT spinners)
- Empty states with encouraging illustrations

### Footer
- Quick links: About, Help, Parent Resources, Telegram Bot
- Social proof: "10,000+ bolalar Python o'rganyapti"
- Language selector (if applicable)
- Contact information
- Newsletter signup for parents

---

## Images

**Hero Section**: 
- Large, colorful illustration of diverse children collaborating on coding
- Style: Flat design or friendly 3D renders (not realistic photos)
- Placement: Right side on desktop, above content on mobile
- Alt: Decorative, not essential for understanding

**Lesson Category Headers**:
- Small iconic illustrations representing topics (variables = box, loops = cycle, etc.)
- Placement: Left of section titles or as card backgrounds (subtle)

**Achievement/Progress**:
- Badge illustrations for milestones
- Celebratory graphics for completed lessons

**Empty States**:
- Friendly character illustrations when no lessons available
- Encouraging visuals for "start learning" prompts

---

## Special Considerations

**Child-Friendly Patterns**:
- Large touch targets (min 44px height for buttons)
- Clear visual feedback for all interactions
- Forgiving error messages with helpful hints
- Progress visualization everywhere
- Celebration moments for completed lessons

**Readability**:
- Ample line-height (leading-relaxed to leading-loose)
- Short paragraphs (3-4 lines max)
- Generous margins around text blocks
- High contrast for text (WCAG AA minimum)

**Navigation**:
- Breadcrumbs for lesson sequences
- Clear "Back" options
- Linear progression (no overwhelming choices)
- "Save progress" indicators

**Animations**: 
Use sparingly for:
- Success celebrations (confetti, checkmarks)
- Lesson card hover states
- Progress bar fills
- Loading transitions
NO scrolling animations or parallax effects

---

This design creates an inviting, structured learning environment that balances playfulness with educational focus, ensuring 10+ year old learners stay engaged while building Python skills progressively.