import type { Job } from "../data/jobs";
import type { StudentProfile } from "../data/profile";

export interface FitFactor {
  label: string;
  score: number;
  max: number;
  detail: string;
  status: "match" | "partial" | "gap";
}

export interface FitResult {
  overall: number;
  label: "Excellent fit" | "Strong fit" | "Good fit" | "Fair fit" | "Low fit";
  color: "excellent" | "strong" | "good" | "fair" | "low";
  factors: FitFactor[];
  matchedSkills: string[];
  missingSkills: string[];
}

function normalizeSkill(s: string) {
  return s.toLowerCase().trim();
}

export function calculateFit(job: Job, profile: StudentProfile): FitResult {
  const factors: FitFactor[] = [];
  let total = 0;
  let maxTotal = 0;

  // Major (25 pts)
  const majorMax = 25;
  const majorMatch = job.majors.some(
    (m) =>
      m.toLowerCase().includes(profile.major.toLowerCase()) ||
      profile.major.toLowerCase().includes(m.toLowerCase().split(" ")[0] ?? "")
  );
  const majorScore = majorMatch ? 25 : job.majors.some((m) => m.includes("Engineering")) && profile.major.includes("Computer") ? 15 : 5;
  factors.push({
    label: "Major",
    score: majorScore,
    max: majorMax,
    detail: majorMatch ? `Matches ${profile.major}` : `Role prefers ${job.majors.slice(0, 2).join(", ")}`,
    status: majorScore >= 20 ? "match" : majorScore >= 12 ? "partial" : "gap",
  });
  total += majorScore;
  maxTotal += majorMax;

  // Skills (35 pts)
  const skillsMax = 35;
  const profileSkills = profile.skills.map(normalizeSkill);
  const required = job.requiredSkills.map(normalizeSkill);
  const preferred = job.preferredSkills.map(normalizeSkill);

  const matchedRequired = required.filter((s) =>
    profileSkills.some((ps) => ps.includes(s) || s.includes(ps))
  );
  const matchedPreferred = preferred.filter((s) =>
    profileSkills.some((ps) => ps.includes(s) || s.includes(ps))
  );
  const matchedSkills = [...new Set([...matchedRequired, ...matchedPreferred])].map(
    (s) => job.requiredSkills.find((r) => normalizeSkill(r) === s) ?? job.preferredSkills.find((p) => normalizeSkill(p) === s) ?? s
  );
  const missingSkills = required
    .filter((s) => !profileSkills.some((ps) => ps.includes(s) || s.includes(ps)))
    .map((s) => job.requiredSkills.find((r) => normalizeSkill(r) === s) ?? s);

  const reqRatio = required.length ? matchedRequired.length / required.length : 1;
  const prefRatio = preferred.length ? matchedPreferred.length / preferred.length : 0.5;
  const skillsScore = Math.round(reqRatio * 25 + prefRatio * 10);
  factors.push({
    label: "Skills",
    score: skillsScore,
    max: skillsMax,
    detail: `${matchedRequired.length}/${required.length} required · ${matchedPreferred.length}/${preferred.length} preferred`,
    status: skillsScore >= 28 ? "match" : skillsScore >= 18 ? "partial" : "gap",
  });
  total += skillsScore;
  maxTotal += skillsMax;

  // Experience level (15 pts)
  const expMax = 15;
  const isStudent = profile.graduationYear >= new Date().getFullYear();
  let expScore = 10;
  if (job.experienceLevel === "Internship" && isStudent) expScore = 15;
  else if (job.experienceLevel === "Entry Level" && profile.graduationYear <= new Date().getFullYear() + 1)
    expScore = 13;
  else if (job.experienceLevel === "Mid Level") expScore = 4;
  factors.push({
    label: "Experience",
    score: expScore,
    max: expMax,
    detail:
      job.experienceLevel === "Internship"
        ? `Internship · Class of ${profile.graduationYear}`
        : `${job.experienceLevel} role`,
    status: expScore >= 12 ? "match" : expScore >= 8 ? "partial" : "gap",
  });
  total += expScore;
  maxTotal += expMax;

  // Location & work mode (15 pts)
  const locMax = 15;
  const locMatch =
    profile.preferredLocations.some(
      (loc) =>
        job.location.toLowerCase().includes(loc.toLowerCase()) ||
        loc.toLowerCase().includes("remote") && job.workMode === "Remote"
    ) || job.workMode === "Remote";
  const typeMatch = profile.preferredJobTypes.includes(job.jobType);
  const locScore = (locMatch ? 10 : 4) + (typeMatch ? 5 : 0);
  factors.push({
    label: "Location & type",
    score: locScore,
    max: locMax,
    detail: `${job.location} · ${job.jobType}${typeMatch ? "" : " (not in your preferences)"}`,
    status: locScore >= 12 ? "match" : locScore >= 8 ? "partial" : "gap",
  });
  total += locScore;
  maxTotal += locMax;

  // Work authorization (10 pts)
  const authMax = 10;
  const authMatch = job.workAuthorization.includes(profile.workAuthorization);
  const authScore = authMatch ? 10 : job.workAuthorization.includes("F-1 OPT") && profile.workAuthorization === "F-1 OPT" ? 10 : 3;
  factors.push({
    label: "Work authorization",
    score: authScore,
    max: authMax,
    detail: authMatch ? profile.workAuthorization : `Requires ${job.workAuthorization.join(" or ")}`,
    status: authScore >= 8 ? "match" : "gap",
  });
  total += authScore;
  maxTotal += authMax;

  const overall = Math.round((total / maxTotal) * 100);

  let label: FitResult["label"];
  let color: FitResult["color"];
  if (overall >= 85) {
    label = "Excellent fit";
    color = "excellent";
  } else if (overall >= 72) {
    label = "Strong fit";
    color = "strong";
  } else if (overall >= 58) {
    label = "Good fit";
    color = "good";
  } else if (overall >= 40) {
    label = "Fair fit";
    color = "fair";
  } else {
    label = "Low fit";
    color = "low";
  }

  return {
    overall,
    label,
    color,
    factors,
    matchedSkills: matchedSkills.filter(Boolean) as string[],
    missingSkills: missingSkills.filter(Boolean) as string[],
  };
}
