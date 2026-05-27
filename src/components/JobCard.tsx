import type { Job } from "../data/jobs";
import type { FitResult } from "../utils/fitScore";
import { FitScore } from "./FitScore";
import "./JobCard.css";

interface JobCardProps {
  job: Job;
  fit: FitResult;
  selected: boolean;
  onClick: () => void;
}

export function JobCard({ job, fit, selected, onClick }: JobCardProps) {
  return (
    <button
      type="button"
      className={`job-card ${selected ? "job-card--selected" : ""}`}
      onClick={onClick}
    >
      <div className="job-card-main">
        <div
          className="employer-logo"
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
        <div className="job-card-content">
          <div className="job-card-top">
            <h3 className="job-title">{job.title}</h3>
            {job.promoted && <span className="promoted-tag">Promoted</span>}
          </div>
          <p className="employer-name">{job.employer}</p>
          <div className="job-meta">
            <span>{job.location}</span>
            <span className="meta-dot">·</span>
            <span>{job.jobType}</span>
            <span className="meta-dot">·</span>
            <span>{job.workMode}</span>
          </div>
          {job.salary && <p className="job-salary">{job.salary}</p>}
          <p className="job-posted">{job.postedAgo}</p>
        </div>
        <FitScore fit={fit} variant="compact" />
      </div>
    </button>
  );
}
