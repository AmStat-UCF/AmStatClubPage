// Officer roster. Names, majors, and years are PLACEHOLDERS until the real board is filled in.
// To add a headshot, put the file in /public/officers/ and set `photo: "/officers/<file>.jpg"`.

export type Officer = {
  name: string;
  role: string;
  duty: string;
  major: string;
  year: string;
  photo?: string;
  linkedin?: string;
  email?: string;
};

export const term = "2026–27";

export const board: Officer[] = [
  {
    name: "Vepaul Hariprashad",
    role: "President",
    duty: "Sets the club’s direction for the year, runs board meetings, and is the main contact for the department and the ASA.",
    major: "Computer Science & Data Science",
    year: "Junior",
  },
  {
    name: "Kirolos Abdelmassih",
    role: "Vice President",
    duty: "Keeps the directors coordinated, steps in for the president, and owns the semester calendar.",
    major: "Data Science",
    year: "Junior",
  },
  {
    name: "Mitchell Weidgans",
    role: "Treasurer",
    duty: "Handles dues, the budget, and funding requests through Student Government.",
    major: "_",
    year: "Sophomore",
  },
  {
    name: "Tyler Pham",
    role: "Secretary",
    duty: "Takes minutes, tracks membership and attendance, and sends the weekly announcements.",
    major: "Acturial Science",
    year: "Senior",
  },
];

export const directors: Officer[] = [
  {
    name: "John Sullivan",
    role: "Projects Director",
    duty: "Reviews project proposals, forms teams, and checks in with them through the semester.",
    major: "Computer Science",
    year: "Junior",
  },
  {
    name: "Victor Carillo",
    role: "Workshop Director",
    duty: "Plans the workshop series and recruits members and faculty to teach sessions.",
    major: "Statistics",
    year: "Freshman",
  },
  {
    name: "Alexandra Honeycutt",
    role: "Outreach Director",
    duty: "Builds relationships with companies, alumni, and other UCF organizations, and books speakers.",
    major: "Data Science",
    year: "Junior",
  },
  {
    name: "Hunter Layfield",
    role: "Director of Student Involvement",
    duty: "Helps new members find their footing and makes sure every major feels welcome at meetings.",
    major: "Data Science",
    year: "Senior",
  },
  {
    name: "Victor Ottaviani",
    role: "Marketing Director",
    duty: "Runs the Instagram and LinkedIn, designs flyers, and photographs events.",
    major: "Integrated Business",
    year: "Senior",
  },
  {
    name: "Sion King",
    role: "Events Director",
    duty: "Books rooms, plans socials, and handles logistics for general body meetings.",
    major: "Statistics",
    year: "Junior",
  },
  {
    name: "Tarun Koottala Nishanth",
    role: "Datathon Director",
    duty: "Co-leads the datathon with Joshua Estime.",
    major: "Computer Science",
    year: "Senior",
  },
  {
    name: "Joshua Estime",
    role: "Datathon Director",
    duty: "Co-leads the datathon with Tarun Koottala Nishanth.",
    major: "Computer Science",
    year: "Junior",
  },
];
