// Site content. Most edits officers need to make happen in this file.
// A fact with `value: null` shows its `hint` as a dashed placeholder until filled in.

export type Fact = {
  label: string;
  value: string | null;
  hint?: string;
};

export type Activity = {
  name: string;
  description: string;
  link: { label: string; href: string };
  note?: string;
};

export type IndexGroup = {
  title: string;
  items: { name: string; href: string; detail: string }[];
};

export const site = {
  name: "AmStat@UCF",
  fullName: "American Statistical Association at the University of Central Florida",
  email: "amstatucf@gmail.com",
  description:
    "The University of Central Florida chapter of the American Statistical Association. Workshops, projects, speakers, and a datathon for anyone who likes statistics.",
};

export const links = {
  discord: "https://discord.gg/eYMzxnc9rM",
  instagram: "https://instagram.com/amstat_ucf",
  linkedin: "https://www.linkedin.com/company/amstat-ucf",
  knightConnect: "https://knightconnect.campuslabs.com/engage/organization/amstat-ucf",
  datathon: "#", // TODO: datathon site URL
  workshopForm: "https://forms.gle/u1nnBTzbcVzWGCh28",
  projectForm: "https://forms.gle/xVtdAnyQ88Zbz5Y3A",
  duesForm: "https://forms.gle/HhJ6ASdbD4Q9841W9",
};

export const meetingFacts: Fact[] = [
  { label: "Meetings", value: null, hint: "Day, time" },
  { label: "Location", value: null, hint: "Building and room" },
  { label: "Dues", value: null, hint: "Amount per semester" },
  { label: "Open to", value: "All UCF students, any major" },
];

export const datathonFacts: Fact[] = [
  { label: "When", value: null, hint: "Dates" },
  { label: "Where", value: null, hint: "Location" },
  { label: "Teams", value: null, hint: "Size" },
  { label: "Who", value: null, hint: "Eligibility" },
];

export const activities: Activity[] = [
  {
    name: "Workshops",
    description:
      "Hands-on sessions on R, Python, and the statistics underneath them. Bring a laptop. Tell us what you want covered and we’ll plan around it.",
    link: { label: "Workshop interest form", href: links.workshopForm },
  },
  {
    name: "Projects",
    description:
      "Small teams spend the semester on a real data problem. Any member can pitch one, and you don’t need to be an expert to join a team.",
    link: { label: "Fall 2026 proposal form", href: links.projectForm },
  },
  {
    name: "Speakers",
    description:
      "Guests from industry, government, and academia talk about what their work looks like day to day, and how they got there.",
    link: { label: "Upcoming events", href: links.knightConnect },
    note: "Listed on KnightConnect",
  },
  {
    name: "Socials",
    description:
      "A chance to meet the people from your stats classes somewhere other than your stats classes.",
    link: { label: "Discord", href: links.discord },
    note: "#announcements",
  },
];

export const linkIndex: IndexGroup[] = [
  {
    title: "Community",
    items: [
      { name: "Discord server", href: links.discord, detail: "discord.gg" },
      { name: "Instagram", href: links.instagram, detail: "@amstat_ucf" },
      { name: "LinkedIn", href: links.linkedin, detail: "amstat-ucf" },
      { name: "KnightConnect", href: links.knightConnect, detail: "campuslabs.com" },
    ],
  },
  {
    title: "Forms",
    items: [
      { name: "Workshop interest", href: links.workshopForm, detail: "Google Form" },
      { name: "Project proposals, Fall 2026", href: links.projectForm, detail: "Google Form" },
      { name: "Club dues payment tracking", href: links.duesForm, detail: "Google Form" },
      { name: "Email the officers", href: `mailto:${site.email}`, detail: site.email },
    ],
  },
];
