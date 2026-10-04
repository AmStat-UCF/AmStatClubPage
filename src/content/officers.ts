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
    name: "Jordan Avery",
    role: "President",
    duty: "Sets the club’s direction for the year, runs board meetings, and is the main contact for the department and the ASA.",
    major: "Statistics",
    year: "Senior",
  },
  {
    name: "Taylor Brooks",
    role: "Vice President",
    duty: "Keeps the directors coordinated, steps in for the president, and owns the semester calendar.",
    major: "Data Science",
    year: "Junior",
  },
  {
    name: "Morgan Ellis",
    role: "Treasurer",
    duty: "Handles dues, the budget, and funding requests through Student Government.",
    major: "Actuarial Science",
    year: "Junior",
  },
  {
    name: "Casey Nguyen",
    role: "Secretary",
    duty: "Takes minutes, tracks membership and attendance, and sends the weekly announcements.",
    major: "Mathematics",
    year: "Sophomore",
  },
];

export const directors: Officer[] = [
  {
    name: "Riley Patel",
    role: "Projects Director",
    duty: "Reviews project proposals, forms teams, and checks in with them through the semester.",
    major: "Statistics",
    year: "Senior",
  },
  {
    name: "Avery Thompson",
    role: "Workshop Director",
    duty: "Plans the workshop series and recruits members and faculty to teach sessions.",
    major: "Computer Science",
    year: "Junior",
  },
  {
    name: "Quinn Ramirez",
    role: "Outreach Director",
    duty: "Builds relationships with companies, alumni, and other UCF organizations, and books speakers.",
    major: "Economics",
    year: "Junior",
  },
  {
    name: "Skyler Chen",
    role: "Director of Student Involvement",
    duty: "Helps new members find their footing and makes sure every major feels welcome at meetings.",
    major: "Psychology",
    year: "Sophomore",
  },
  {
    name: "Reese Martin",
    role: "Marketing Director",
    duty: "Runs the Instagram and LinkedIn, designs flyers, and photographs events.",
    major: "Digital Media",
    year: "Junior",
  },
  {
    name: "Emerson Diaz",
    role: "Events Director",
    duty: "Books rooms, plans socials, and handles logistics for general body meetings.",
    major: "Data Science",
    year: "Sophomore",
  },
  {
    name: "Rowan Okafor",
    role: "Datathon Director",
    duty: "Co-leads the datathon: sponsors, the dataset, judging, and the event weekend itself.",
    major: "Statistics",
    year: "Senior",
  },
  {
    name: "Parker Singh",
    role: "Datathon Director",
    duty: "Co-leads the datathon: registration, team formation, and communication with participants.",
    major: "Industrial Engineering",
    year: "Junior",
  },
];
