import type { Job } from "../data/jobs";
import type { FitResult } from "../utils/fitScore";
import { formatDeadlineLabel, deadlineUrgency } from "../utils/deadline";
import { getEmployerColor } from "../utils/employerStyle";
import { FitScore } from "./FitScore";
import "./JobCard.css";

interface JobCardProps {
  job: Job;
  fit: FitResult;
  whySeeing: string;
  selected: boolean;
  applicationStatus?: string;
  onClick: () => void;
}

export function JobCard({
  job,
  fit,
  whySeeing,
  selected,
  applicationStatus,
  onClick,
}: JobCardProps) {
  const urgency = deadlineUrgency(job.applicationDeadline);

  return (
    <button
      type="button"
      className={`job-card ${selected ? "job-card--selected" : ""}`}
      onClick={onClick}
    >
      <div className="job-card-main">
        <div
          className="employer-logo"
          style={{ background: getEmployerColor(job.employer) }}
        >
          {job.employerLogo}
        </div>
        <div className="job-card-content">
          <div className="job-card-top">
            <h3 className="job-title">{job.title}</h3>
            {job.promoted && <span className="promoted-tag">Promoted</span>}
            {applicationStatus && (
              <span className="app-status-tag">{applicationStatus}</span>
            )}
          </div>
          <p className="employer-name">{job.employer}</p>
          <div className="glance-chips">
            {job.salary && <span className="glance-chip">{job.salary}</span>}
            <span className="glance-chip">{job.workMode}</span>
            <span className="glance-chip">{job.jobType}</span>
            <span className={`glance-chip glance-chip--deadline glance-chip--${urgency}`}>
              {formatDeadlineLabel(job.applicationDeadline)}
            </span>
          </div>
          <p className="why-seeing">{whySeeing}</p>
          <p className="job-posted">{job.postedAgo}</p>
        </div>
        <FitScore fit={fit} variant="compact" />
      </div>
    </button>
  );
}
