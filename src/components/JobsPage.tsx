import { useMemo, useState } from "react";
import { jobs } from "../data/jobs";
import { studentProfile } from "../data/profile";
import { calculateFit } from "../utils/fitScore";
import { JobCard } from "./JobCard";
import { JobDetail } from "./JobDetail";
import "./JobsPage.css";

const filters = ["All filters", "Job type", "Location", "Remote", "Internship", "Pay"];

export function JobsPage() {
  const [selectedId, setSelectedId] = useState(jobs[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const [sortByFit, setSortByFit] = useState(true);

  const jobsWithFit = useMemo(() => {
    return jobs.map((job) => ({
      job,
      fit: calculateFit(job, studentProfile),
    }));
  }, []);

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
    if (sortByFit) {
      list = [...list].sort((a, b) => b.fit.overall - a.fit.overall);
    }
    return list;
  }, [jobsWithFit, search, sortByFit]);

  const selected = filtered.find(({ job }) => job.id === selectedId) ?? filtered[0];

  return (
    <div className="jobs-page">
      <header className="jobs-header">
        <h1>Jobs</h1>
        <p className="jobs-subtitle">
          <span className="interest-count">248 jobs</span> match your interests
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
        <label className="sort-fit-toggle">
          <input
            type="checkbox"
            checked={sortByFit}
            onChange={(e) => setSortByFit(e.target.checked)}
          />
          Sort by fit
        </label>
      </div>

      <div className="jobs-split">
        <div className="jobs-list-panel">
          {filtered.map(({ job, fit }) => (
            <JobCard
              key={job.id}
              job={job}
              fit={fit}
              selected={selected?.job.id === job.id}
              onClick={() => setSelectedId(job.id)}
            />
          ))}
        </div>
        <div className="jobs-detail-panel">
          {selected ? (
            <JobDetail job={selected.job} fit={selected.fit} />
          ) : (
            <div className="jobs-empty">Select a job to view details</div>
          )}
        </div>
      </div>
    </div>
  );
}
