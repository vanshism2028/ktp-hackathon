import { useMemo, useState } from "react";
import { jobs } from "../data/jobs";
import { useApp } from "../context/AppContext";
import { calculateFit } from "../utils/fitScore";
import { getWhySeeingThis, getDuplicateWarning } from "../utils/fitInsights";
import { JobCard } from "./JobCard";
import { JobDetail } from "./JobDetail";
import "./JobsPage.css";

const filters = ["All filters", "Job type", "Location", "Remote", "Internship", "Pay"];
const MIN_FIT_DEFAULT = 60;

const STATUS_LABELS: Record<string, string> = {
  saved: "Saved",
  applied: "Applied",
  under_review: "Reviewing",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};

export function JobsPage() {
  const { profile, applications } = useApp();
  const [selectedId, setSelectedId] = useState(jobs[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const [sortByFit, setSortByFit] = useState(true);
  const [hideLowFit, setHideLowFit] = useState(true);
  const [minFit, setMinFit] = useState(MIN_FIT_DEFAULT);

  const jobsWithFit = useMemo(() => {
    return jobs.map((job) => {
      const fit = calculateFit(job, profile);
      return {
        job,
        fit,
        whySeeing: getWhySeeingThis(job, profile),
        duplicateWarning: getDuplicateWarning(job, applications),
      };
    });
  }, [profile, applications]);

  const filtered = useMemo(() => {
    let list = jobsWithFit;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        ({ job }) =>
          job.title.toLowerCase().includes(q) ||
          job.employer.toLowerCase().includes(q)
      );
    }
    if (hideLowFit) {
      list = list.filter(({ fit }) => fit.overall >= minFit);
    }
    if (sortByFit) {
      list = [...list].sort((a, b) => b.fit.overall - a.fit.overall);
    }
    return list;
  }, [jobsWithFit, search, sortByFit, hideLowFit, minFit]);

  const selected =
    filtered.find(({ job }) => job.id === selectedId) ?? filtered[0];

  const matchCount = jobsWithFit.filter(({ fit }) => fit.overall >= minFit).length;

  return (
    <div className="jobs-page">
      <header className="jobs-header">
        <h1>Jobs</h1>
        <p className="jobs-subtitle">
          <span className="interest-count">{matchCount} jobs</span> match your profile
          {hideLowFit && ` (${minFit}%+ fit)`}
          <button type="button" className="edit-interests" aria-label="Edit interests">
            ✎
          </button>
        </p>
      </header>

      <div className="jobs-toolbar">
        <div className="search-wrap">
          <svg className="search-icon" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="search"
            placeholder="Search jobs, employers, or keywords"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-pills">
          {filters.map((f, i) => (
            <button
              key={f}
              type="button"
              className={`filter-pill ${i === 0 ? "filter-pill--outline" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="jobs-toggles">
          <label className="sort-fit-toggle">
            <input
              type="checkbox"
              checked={sortByFit}
              onChange={(e) => setSortByFit(e.target.checked)}
            />
            Sort by fit
          </label>
          <label className="sort-fit-toggle">
            <input
              type="checkbox"
              checked={hideLowFit}
              onChange={(e) => setHideLowFit(e.target.checked)}
            />
            Hide low-fit jobs
          </label>
          {hideLowFit && (
            <label className="min-fit-slider">
              Min fit: {minFit}%
              <input
                type="range"
                min={40}
                max={90}
                step={5}
                value={minFit}
                onChange={(e) => setMinFit(Number(e.target.value))}
              />
            </label>
          )}
        </div>
      </div>

      <div className="jobs-split">
        <div className="jobs-list-panel">
          {filtered.length === 0 ? (
            <div className="jobs-empty-list">
              No jobs meet your fit threshold. Lower the min fit % or turn off &quot;Hide
              low-fit jobs&quot;.
            </div>
          ) : (
            filtered.map(({ job, fit, whySeeing }) => {
              const app = applications.find((a) => a.jobId === job.id);
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  fit={fit}
                  whySeeing={whySeeing}
                  selected={selected?.job.id === job.id}
                  applicationStatus={app ? STATUS_LABELS[app.status] : undefined}
                  onClick={() => setSelectedId(job.id)}
                />
              );
            })
          )}
        </div>
        <div className="jobs-detail-panel">
          {selected ? (
            <JobDetail
              job={selected.job}
              fit={selected.fit}
              whySeeing={selected.whySeeing}
              duplicateWarning={selected.duplicateWarning}
            />
          ) : (
            <div className="jobs-empty">Select a job to view details</div>
          )}
        </div>
      </div>
    </div>
  );
}
