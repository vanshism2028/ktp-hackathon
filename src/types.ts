export type Page = "jobs" | "applications" | "messages" | "profile";

export type ApplicationStatus =
  | "saved"
  | "applied"
  | "under_review"
  | "interview"
  | "offer"
  | "rejected";

export interface Application {
  id: string;
  jobId: string;
  status: ApplicationStatus;
  appliedAt?: string;
  updatedAt: string;
  nextStep?: string;
}
