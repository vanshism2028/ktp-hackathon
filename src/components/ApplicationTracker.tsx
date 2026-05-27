import { jobs } from "../data/jobs";
import { useApp } from "../context/AppContext";
import { getEmployerColor } from "../utils/employerStyle";
import type { ApplicationStatus } from "../types";
import "./ApplicationTracker.css";

const STATUS_ORDER: ApplicationStatus[] = [
  "saved",
  "applied",
  "under_review",
  "interview",
  "offer",
  "rejected",
];

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  saved: "Saved",
  applied: "Applied",
  under_review: "Under review",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};

export function ApplicationTracker() {
  const { applications } = useApp();

  const withJobs = applications
    .map((app) => ({
      app,
      job: jobs.find((j) => j.id === app.jobId),
    }))
    .filter((x) => x.job);

  const grouped = STATUS_ORDER.map((status) => ({
    status,
    items: withJobs.filter((x) => x.app.status === status),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="tracker-page">
      <header className="tracker-header">
        <h1>Applications</h1>
        <p className="tracker-subtitle">
          Track every role from saved → applied → interview in one place
        </p>
      </header>

      <div className="tracker-pipeline">
        {STATUS_ORDER.slice(0, 5).map((status) => {
          const count = withJobs.filter((x) => x.app.status === status).length;
          return (
            <div key={status} className="pipeline-step">
              <span className="pipeline-count">{count}</span>
              <span className="pipeline-label">{STATUS_LABELS[status]}</span>
            </div>
          );
        })}
      </div>

      <div className="tracker-sections">
        {grouped.map(({ status, items }) => (
          <section key={status} className="tracker-section">
            <h2>{STATUS_LABELS[status]}</h2>
            <div className="tracker-cards">
              {items.map(({ app, job }) =>
                job ? (
                  <article key={app.id} className="tracker-card">
                    <div
                      className="employer-logo"
                      style={{ background: getEmployerColor(job.employer) }}
                    >
                      {job.employerLogo}
                    </div>
                    <div className="tracker-card-body">
                      <h3>{job.title}</h3>
                      <p>{job.employer}</p>
                      {app.appliedAt && (
                        <p className="tracker-meta">Applied {app.appliedAt}</p>
                      )}
                      {app.nextStep && (
                        <p className="tracker-next">
                          <strong>Next:</strong> {app.nextStep}
                        </p>
                      )}
                    </div>
                    <span className={`tracker-status tracker-status--${status}`}>
                      {STATUS_LABELS[status]}
                    </span>
                  </article>
                ) : null
              )}
            </div>
          </section>
        ))}
      </div>

      {withJobs.length === 0 && (
        <p className="tracker-empty">No applications yet. Apply from the Jobs page.</p>
      )}
    </div>
  );
}
