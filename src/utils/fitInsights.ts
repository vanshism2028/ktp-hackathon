import { jobs, type Job } from "../data/jobs";
import type { StudentProfile } from "../data/profile";
import type { Application } from "../types";
import { calculateFit } from "./fitScore";

export function getWhySeeingThis(job: Job, profile: StudentProfile): string {
  const fit = calculateFit(job, profile);
  const reasons: string[] = [];

  const majorOk = fit.factors.find((f) => f.label === "Major" && f.status === "match");
  if (majorOk) reasons.push(`your ${profile.major} major`);

  if (fit.matchedSkills.length > 0) {
    reasons.push(fit.matchedSkills.slice(0, 2).join(" & ") + " skills");
  }

  if (profile.preferredJobTypes.includes(job.jobType)) {
    reasons.push(`${job.jobType.toLowerCase()} roles you prefer`);
  }

  if (job.workMode === "Remote" && profile.preferredLocations.some((l) => l.toLowerCase().includes("remote"))) {
    reasons.push("remote work preference");
  }

  if (profile.interests.some((i) => job.title.toLowerCase().includes(i.toLowerCase().split(" ")[0] ?? ""))) {
    reasons.push("career interests");
  }

  if (reasons.length === 0) {
    return "Shown because it’s approved for your school — fit may be limited.";
  }

  return `Matches ${reasons.slice(0, 3).join(", ")}.`;
}

export interface ProfileSuggestion {
  skill: string;
  jobsUnlocked: number;
  avgFitBoost: number;
  sampleEmployers: string[];
}

export function getProfileSuggestions(profile: StudentProfile): ProfileSuggestion[] {
  const allSkills = new Set<string>();
  jobs.forEach((j) => {
    j.requiredSkills.forEach((s) => allSkills.add(s));
    j.preferredSkills.forEach((s) => allSkills.add(s));
  });

  const missing = [...allSkills].filter(
    (s) => !profile.skills.some((ps) => ps.toLowerCase() === s.toLowerCase())
  );

  const suggestions: ProfileSuggestion[] = missing.map((skill) => {
    let jobsUnlocked = 0;
    let totalBoost = 0;
    const employers: string[] = [];

    jobs.forEach((job) => {
      const needsSkill =
        job.requiredSkills.some((r) => r.toLowerCase() === skill.toLowerCase()) ||
        job.preferredSkills.some((p) => p.toLowerCase() === skill.toLowerCase());
      if (!needsSkill) return;

      const before = calculateFit(job, profile).overall;
      const afterProfile = { ...profile, skills: [...profile.skills, skill] };
      const after = calculateFit(job, afterProfile).overall;
      if (after > before) {
        jobsUnlocked += 1;
        totalBoost += after - before;
        if (employers.length < 3) employers.push(job.employer);
      }
    });

    return {
      skill,
      jobsUnlocked,
      avgFitBoost: jobsUnlocked ? Math.round(totalBoost / jobsUnlocked) : 0,
      sampleEmployers: employers,
    };
  });

  return suggestions
    .filter((s) => s.jobsUnlocked > 0)
    .sort((a, b) => b.jobsUnlocked - a.jobsUnlocked)
    .slice(0, 5);
}

export function getDuplicateWarning(
  job: Job,
  applications: Application[]
): string | null {
  const existing = applications.find(
    (a) => {
      const other = jobs.find((j) => j.id === a.jobId);
      return other && other.employer === job.employer && other.id !== job.id;
    }
  );
  if (!existing) return null;
  const otherJob = jobs.find((j) => j.id === existing.jobId);
  if (!otherJob) return null;
  return `You already applied to "${otherJob.title}" at ${job.employer}. Consider focusing on one role per company.`;
}

export function getProfileCompleteness(profile: StudentProfile): number {
  let score = 0;
  if (profile.major) score += 20;
  if (profile.skills.length >= 5) score += 25;
  else score += profile.skills.length * 5;
  if (profile.preferredLocations.length >= 2) score += 15;
  if (profile.preferredJobTypes.length >= 1) score += 15;
  if (profile.interests.length >= 2) score += 15;
  if (profile.workAuthorization) score += 10;
  return Math.min(100, score);
}
