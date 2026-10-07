// About page content. Generic draft copy: replace before launch.
// Anything marked `placeholder: true` renders with a visible placeholder style.

export type Stat = { label: string; value: number; placeholder?: boolean };

export const stats: Stat[] = [
  { label: "Founded", value: 2023 },
  { label: "Officers", value: 12 },
  { label: "Members", value: 140, placeholder: false },
  { label: "Workshops a semester", value: 4-6, placeholder: false },
];

export const audiences = [
  {
    title: "Statistics and data science majors",
    text: "Practice the methods from class on messier data, and meet the people you’ll be studying with for the next few years.",
  },
  {
    title: "Actuarial science students",
    text: "Exam prep is lonely. Workshops and projects give you applied work to point to, and people who know what P and FM mean.",
  },
  {
    title: "Everyone else",
    text: "Biology, finance, psychology, engineering: if your field runs on data, the skills carry over. No prerequisites.",
  },
];

export const history: { year: string; event: string; placeholder?: boolean }[] = [
  { year: "2024", event: "First full semester of workshops and general body meetings.", placeholder: true },
  { year: "2025", event: "Member project teams launched, with first presentations at the end of the spring semester.", placeholder: true },
  { year: "2026", event: "Expanding collabs, hosting an estimathon, planning for UCF's first official datathon.", placeholder: true },
];

export const faqs = [
  {
    q: "Do I need to be a statistics major?",
    a: "No. Members come from all over the university. If you’re curious about data, you’ll fit in.",
  },
  {
    q: "I’ve never written code. Is that a problem?",
    a: "Not at all. Workshops start from the basics, and project teams pair newer members with people who’ve done it before.",
  },
  {
    q: "How much are dues, and what do they cover?",
    a: "Dues are collected each semester and pay for workshop materials, food at meetings, and datathon costs. Ask an officer for the current amount.",
  },
  {
    q: "When and where do you meet?",
    a: "General body meetings happen during the semester on campus. Times and rooms are posted on Discord and KnightConnect.",
  },
  {
    q: "Can graduate students join?",
    a: "Yes. Graduate students are welcome as members, mentors on project teams, and workshop speakers.",
  },
  {
    q: "How do I become an officer?",
    a: "Elections are held each spring for the following year. Come to meetings, help out with an event, and run when positions open.",
  },
];
