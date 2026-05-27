import type { Application } from "../types";

export const initialApplications: Application[] = [
  {
    id: "app-1",
    jobId: "1",
    status: "interview",
    appliedAt: "2026-05-10",
    updatedAt: "2026-05-22",
    nextStep: "Technical interview — May 28",
  },
  {
    id: "app-2",
    jobId: "3",
    status: "under_review",
    appliedAt: "2026-05-15",
    updatedAt: "2026-05-20",
    nextStep: "Recruiter reviewing application",
  },
  {
    id: "app-3",
    jobId: "2",
    status: "applied",
    appliedAt: "2026-05-18",
    updatedAt: "2026-05-18",
    nextStep: "Wait for employer response",
  },
  {
    id: "app-4",
    jobId: "5",
    status: "saved",
    updatedAt: "2026-05-24",
    nextStep: "Complete portfolio link on profile",
  },
];
