import type { Job } from "../data/jobs";
import type { FitResult } from "../utils/fitScore";
import { FitScore } from "./FitScore";
import "./JobDetail.css";

interface JobDetailProps {
  job: Job;
  fit: FitResult;
}

export function JobDetail({ job, fit }: JobDetailProps) {
  return (
    <div className="job-detail">
      <div className="job-detail-header">
        <div
          className="employer-logo employer-logo--lg"
          style={{
            background:
              job.employer === "Stripe"
                ? "#635bff"
                : job.employer === "Notion"
                  ? "#000"
                  : job.employer === "OpenAI"
                    ? "#10a37f"
                    : "#6490f2",
          }}
        >
          {job.employerLogo}
        </div>
        <div className="job-detail-title-block">
          <h1>{job.title}</h1>
          <p className="detail-employer">{job.employer}</p>
          <div className="detail-actions">
            <button type="button" className="btn btn-primary">
              Apply
            </button>
            <button type="button" className="btn btn-secondary">
              Save
            </button>
            <button type="button" className="btn btn-ghost" aria-label="Share">
              ↗
            </button>
          </div>
        </div>
      </div>

      <FitScore fit={fit} variant="full" />

      <section className="detail-section at-a-glance">
        <h2>At a glance</h2>
        <div className="glance-grid">
          <div className="glance-item">
            <span className="glance-label">Pay</span>
            <span className="glance-value">{job.salary ?? "Not listed"}</span>
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
