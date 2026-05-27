export interface StudentProfile {
  name: string;
  school: string;
  major: string;
  graduationYear: number;
  skills: string[];
  preferredLocations: string[];
  preferredJobTypes: ("Internship" | "Full-Time" | "Part-Time")[];
  workAuthorization: "US Citizen" | "F-1 OPT" | "Requires Sponsorship";
  interests: string[];
}

export const studentProfile: StudentProfile = {
  name: "Alex Chen",
  school: "University of Michigan",
  major: "Computer Science",
  graduationYear: 2026,
  skills: [
    "Python",
    "JavaScript",
    "React",
    "TypeScript",
    "SQL",
    "Git",
    "Machine Learning",
    "Data Analysis",
  ],
  preferredLocations: ["Remote", "Ann Arbor, MI", "San Francisco, CA"],
  preferredJobTypes: ["Internship", "Full-Time"],
  workAuthorization: "US Citizen",
  interests: ["Software Engineering", "Data Science", "Product"],
};
