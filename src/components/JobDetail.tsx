import type { Job } from "../data/jobs";
import type { FitResult } from "../utils/fitScore";
import { formatDeadlineLabel, deadlineUrgency } from "../utils/deadline";
import { getEmployerColor } from "../utils/employerStyle";
import { useApp } from "../context/AppContext";
import { FitScore } from "./FitScore";
import "./JobDetail.css";

interface JobDetailProps {
  job: Job;
  fit: FitResult;
  whySeeing: string;
  duplicateWarning: string | null;
}

export function JobDetail({ job, fit, whySeeing, duplicateWarning }: JobDetailProps) {
  const { applyToJob, saveJob, getApplicationForJob } = useApp();
  const application = getApplicationForJob(job.id);
  const urgency = deadlineUrgency(job.applicationDeadline);

  return (
    <div className="job-detail">
      <div className="job-detail-header">
        <div
          className="employer-logo employer-logo--lg"
          style={{ background: getEmployerColor(job.employer) }}
        >
          {job.employerLogo}
        </div>
        <div className="job-detail-title-block">
          <h1>{job.title}</h1>
          <p className="detail-employer">{job.employer}</p>
          <p className="why-seeing-detail">{whySeeing}</p>
          <div className="detail-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => applyToJob(job.id)}
              disabled={application?.status === "applied" || application?.status === "interview"}
            >
              {application?.status === "applied" || application?.status === "interview"
                ? "Applied"
                : application?.status === "under_review"
                  ? "Under review"
                  : "Apply"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => saveJob(job.id)}>
              {application?.status === "saved" ? "Saved" : "Save"}
            </button>
            <button type="button" className="btn btn-ghost" aria-label="Share">
              ↗
            </button>
          </div>
        </div>
      </div>

      {duplicateWarning && (
        <div className="alert alert-warning" role="alert">
          {duplicateWarning}
        </div>
      )}

      {application && (
        <div className="alert alert-info">
          <strong>Application status:</strong>{" "}
          {application.status.replace("_", " ")}
          {application.nextStep && ` — ${application.nextStep}`}
        </div>
      )}

      <FitScore fit={fit} variant="full" />

      <section className="detail-section at-a-glance">
        <h2>At a glance</h2>
        <div className="glance-grid">
          <div className="glance-item">
            <span className="glance-label">Pay</span>
            <span className="glance-value">{job.salary ?? "Not disclosed"}</span>
          </div>
          <div className="glance-item">
            <span className="glance-label">Location</span>
            <span className="glance-value">{job.location}</span>
          </div>
          <div className="glance-item">
            <span className="glance-label">Job type</span>
            <span className="glance-value">{job.jobType}</span>
          </div>
          <div className="glance-item">
            <span className="glance-label">Work style</span>
            <span className="glance-value">{job.workMode}</span>
          </div>
          <div className="glance-item">
            <span className="glance-label">Work authorization</span>
            <span className="glance-value">{job.workAuthorization.join(", ")}</span>
          </div>
          <div className="glance-item">
            <span className="glance-label">Deadline</span>
            <span className={`glance-value glance-deadline--${urgency}`}>
              {formatDeadlineLabel(job.applicationDeadline)}
            </span>
          </div>
        </div>
      </section>

      <section className="detail-section">
        <h2>About the job</h2>
        <p>{job.description}</p>
      </section>

      <section className="detail-section">
        <h2>What they&apos;re looking for</h2>
        <ul>
          {job.qualifications.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
        <div className="skills-row">
          <span className="skills-label">Required:</span>
          {job.requiredSkills.map((s) => (
            <span key={s} className="skill-tag">
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <h2>What this job offers</h2>
        <ul>
          {job.benefits.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <p className="applicants-note">{job.applicants.toLocaleString()} students have applied</p>
    </div>
  );
}
