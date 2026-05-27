export interface Job {
  id: string;
  title: string;
  employer: string;
  employerLogo: string;
  location: string;
  jobType: "Internship" | "Full-Time" | "Part-Time";
  workMode: "Remote" | "Hybrid" | "On-site";
  salary?: string;
  postedAgo: string;
  majors: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  experienceLevel: "Entry Level" | "Internship" | "Mid Level";
  workAuthorization: ("US Citizen" | "F-1 OPT" | "Requires Sponsorship")[];
  description: string;
  qualifications: string[];
  benefits: string[];
  applicants: number;
  promoted?: boolean;
}

export const jobs: Job[] = [
  {
    id: "1",
    title: "Software Engineering Intern",
    employer: "Stripe",
    employerLogo: "S",
    location: "San Francisco, CA",
    jobType: "Internship",
    workMode: "Hybrid",
    salary: "$45–55/hr",
    postedAgo: "2 days ago",
    majors: ["Computer Science", "Software Engineering", "Electrical Engineering"],
    requiredSkills: ["Python", "JavaScript", "Git"],
    preferredSkills: ["React", "TypeScript", "SQL"],
    experienceLevel: "Internship",
    workAuthorization: ["US Citizen", "F-1 OPT"],
    description:
      "Join Stripe's summer intern program and work on payments infrastructure used by millions of businesses worldwide.",
    qualifications: [
      "Currently pursuing a BS/MS in CS or related field",
      "Expected graduation between Dec 2026 – June 2027",
      "Strong fundamentals in data structures and algorithms",
    ],
    benefits: ["Housing stipend", "Mentorship program", "Return offer pathway"],
    applicants: 342,
    promoted: true,
  },
  {
    id: "2",
    title: "Junior Data Analyst",
    employer: "Deloitte",
    employerLogo: "D",
    location: "Chicago, IL",
    jobType: "Full-Time",
    workMode: "On-site",
    salary: "$65,000–72,000/yr",
    postedAgo: "1 week ago",
    majors: ["Data Science", "Statistics", "Economics", "Business"],
    requiredSkills: ["SQL", "Excel", "Data Analysis"],
    preferredSkills: ["Python", "Tableau", "Power BI"],
    experienceLevel: "Entry Level",
    workAuthorization: ["US Citizen"],
    description:
      "Support consulting teams with data-driven insights for Fortune 500 clients across healthcare and finance.",
    qualifications: [
      "Bachelor's degree completed or expected within 6 months",
      "Strong analytical and communication skills",
    ],
    benefits: ["Health insurance", "401(k) match", "Professional development"],
    applicants: 891,
  },
  {
    id: "3",
    title: "Frontend Developer Intern",
    employer: "Notion",
    employerLogo: "N",
    location: "Remote",
    jobType: "Internship",
    workMode: "Remote",
    salary: "$40–48/hr",
    postedAgo: "3 days ago",
    majors: ["Computer Science", "Design", "HCI"],
    requiredSkills: ["JavaScript", "React", "CSS"],
    preferredSkills: ["TypeScript", "Figma"],
    experienceLevel: "Internship",
    workAuthorization: ["US Citizen", "F-1 OPT"],
    description:
      "Build delightful product experiences on Notion's web app. Collaborate with design and backend engineers.",
    qualifications: [
      "Portfolio or GitHub demonstrating frontend projects",
      "Available for 12-week summer internship",
    ],
    benefits: ["Remote-first culture", "Learning stipend", "Free Notion plan"],
    applicants: 156,
    promoted: true,
  },
  {
    id: "4",
    title: "Machine Learning Engineer",
    employer: "OpenAI",
    employerLogo: "O",
    location: "San Francisco, CA",
    jobType: "Full-Time",
    workMode: "On-site",
    salary: "$180,000–220,000/yr",
    postedAgo: "5 days ago",
    majors: ["Computer Science", "Mathematics", "Physics"],
    requiredSkills: ["Python", "Machine Learning", "PyTorch", "CUDA"],
    preferredSkills: ["Distributed Systems", "C++", "Research Publications"],
    experienceLevel: "Mid Level",
    workAuthorization: ["US Citizen"],
    description:
      "Research and deploy ML models at scale. Work on training infrastructure and model evaluation.",
    qualifications: [
      "MS/PhD in ML, CS, or equivalent experience",
      "3+ years ML engineering experience",
      "Published research preferred",
    ],
    benefits: ["Equity", "Health & wellness", "Unlimited PTO"],
    applicants: 2104,
  },
  {
    id: "5",
    title: "Product Design Intern",
    employer: "Figma",
    employerLogo: "F",
    location: "New York, NY",
    jobType: "Internship",
    workMode: "Hybrid",
    salary: "$38–42/hr",
    postedAgo: "4 days ago",
    majors: ["Design", "HCI", "Graphic Design"],
    requiredSkills: ["Figma", "User Research", "Prototyping"],
    preferredSkills: ["HTML", "CSS"],
    experienceLevel: "Internship",
    workAuthorization: ["US Citizen", "F-1 OPT"],
    description:
      "Design features used by millions of designers. Partner with PMs and engineers on end-to-end product work.",
    qualifications: [
      "Strong portfolio showcasing UX process",
      "Currently enrolled in design-related program",
    ],
    benefits: ["Design mentorship", "Free Figma", "Team offsites"],
    applicants: 428,
  },
  {
    id: "6",
    title: "Business Analyst Intern",
    employer: "McKinsey & Company",
    employerLogo: "M",
    location: "Boston, MA",
    jobType: "Internship",
    workMode: "On-site",
    salary: "$9,500/month",
    postedAgo: "1 day ago",
    majors: ["Business", "Economics", "Engineering"],
    requiredSkills: ["Excel", "PowerPoint", "Problem Solving"],
    preferredSkills: ["SQL", "Python"],
    experienceLevel: "Internship",
    workAuthorization: ["US Citizen"],
    description:
      "Solve complex business problems for global clients. Develop analytical frameworks and present to leadership.",
    qualifications: [
      "Outstanding academic record",
      "Leadership experience on campus or elsewhere",
    ],
    benefits: ["Travel opportunities", "Case prep training", "Full-time pipeline"],
    applicants: 1203,
  },
];
