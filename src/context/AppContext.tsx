import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialApplications } from "../data/applications";
import { studentProfile as defaultProfile } from "../data/profile";
import type { StudentProfile } from "../data/profile";
import type { Application, ApplicationStatus, Page } from "../types";

interface AppContextValue {
  page: Page;
  setPage: (page: Page) => void;
  profile: StudentProfile;
  addSkill: (skill: string) => void;
  applications: Application[];
  applyToJob: (jobId: string) => void;
  saveJob: (jobId: string) => void;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
  getApplicationForJob: (jobId: string) => Application | undefined;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>("jobs");
  const [profile, setProfile] = useState<StudentProfile>(defaultProfile);
  const [applications, setApplications] = useState<Application[]>(initialApplications);

  const addSkill = useCallback((skill: string) => {
    setProfile((p) => {
      if (p.skills.some((s) => s.toLowerCase() === skill.toLowerCase())) return p;
      return { ...p, skills: [...p.skills, skill] };
    });
  }, []);

  const getApplicationForJob = useCallback(
    (jobId: string) => applications.find((a) => a.jobId === jobId),
    [applications]
  );

  const applyToJob = useCallback((jobId: string) => {
    setApplications((prev) => {
      const existing = prev.find((a) => a.jobId === jobId);
      if (existing) {
        return prev.map((a) =>
          a.jobId === jobId
            ? {
                ...a,
                status: "applied" as const,
                appliedAt: new Date().toISOString().slice(0, 10),
                updatedAt: new Date().toISOString().slice(0, 10),
                nextStep: "Wait for employer response",
              }
            : a
        );
      }
      return [
        ...prev,
        {
          id: `app-${Date.now()}`,
          jobId,
          status: "applied" as const,
          appliedAt: new Date().toISOString().slice(0, 10),
          updatedAt: new Date().toISOString().slice(0, 10),
          nextStep: "Wait for employer response",
        },
      ];
    });
  }, []);

  const saveJob = useCallback((jobId: string) => {
    setApplications((prev) => {
      if (prev.some((a) => a.jobId === jobId)) return prev;
      return [
        ...prev,
        {
          id: `app-${Date.now()}`,
          jobId,
          status: "saved" as const,
          updatedAt: new Date().toISOString().slice(0, 10),
          nextStep: "Apply when ready",
        },
      ];
    });
  }, []);

  const updateApplicationStatus = useCallback((id: string, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status, updatedAt: new Date().toISOString().slice(0, 10) }
          : a
      )
    );
  }, []);

  const value = useMemo(
    () => ({
      page,
      setPage,
      profile,
      addSkill,
      applications,
      applyToJob,
      saveJob,
      updateApplicationStatus,
      getApplicationForJob,
    }),
    [
      page,
      profile,
      addSkill,
      applications,
      applyToJob,
      saveJob,
      updateApplicationStatus,
      getApplicationForJob,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
