import type { FitResult } from "../utils/fitScore";
import "./FitScore.css";

interface FitScoreProps {
  fit: FitResult;
  variant?: "compact" | "full";
}

export function FitScore({ fit, variant = "compact" }: FitScoreProps) {
  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (fit.overall / 100) * circumference;

  if (variant === "compact") {
    return (
      <div className={`fit-badge fit-badge--${fit.color}`} title={fit.label}>
        <div className="fit-ring-wrap">
          <svg className="fit-ring" viewBox="0 0 40 40" aria-hidden>
            <circle className="fit-ring-bg" cx="20" cy="20" r="18" />
            <circle
              className="fit-ring-fill"
              cx="20"
              cy="20"
              r="18"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <span className="fit-percent">{fit.overall}%</span>
        </div>
        <span className="fit-label">{fit.label}</span>
      </div>
    );
  }

  return (
    <div className={`fit-panel fit-panel--${fit.color}`}>
      <div className="fit-panel-header">
        <div className="fit-panel-score">
          <svg className="fit-ring fit-ring--lg" viewBox="0 0 56 56" aria-hidden>
            <circle className="fit-ring-bg" cx="28" cy="28" r="24" />
            <circle
              className="fit-ring-fill"
              cx="28"
              cy="28"
              r="24"
              strokeDasharray={2 * Math.PI * 24}
              strokeDashoffset={2 * Math.PI * 24 - (fit.overall / 100) * 2 * Math.PI * 24}
            />
          </svg>
          <div className="fit-panel-numbers">
            <span className="fit-panel-percent">{fit.overall}%</span>
            <span className="fit-panel-label">{fit.label}</span>
          </div>
        </div>
        <p className="fit-panel-desc">
          Based on your major, skills, graduation year, location preferences, and work authorization.
        </p>
      </div>

      <div className="fit-factors">
        {fit.factors.map((f) => (
          <div key={f.label} className="fit-factor">
            <div className="fit-factor-top">
              <span className="fit-factor-label">{f.label}</span>
              <span className={`fit-factor-status fit-factor-status--${f.status}`}>
                {f.status === "match" ? "✓" : f.status === "partial" ? "~" : "!"}
              </span>
            </div>
            <div className="fit-factor-bar">
              <div
                className="fit-factor-fill"
                style={{ width: `${(f.score / f.max) * 100}%` }}
              />
            </div>
            <span className="fit-factor-detail">{f.detail}</span>
          </div>
        ))}
      </div>

      {(fit.matchedSkills.length > 0 || fit.missingSkills.length > 0) && (
        <div className="fit-skills">
          {fit.matchedSkills.length > 0 && (
            <div className="fit-skills-group">
              <span className="fit-skills-title">Your matching skills</span>
              <div className="fit-chips">
                {fit.matchedSkills.map((s) => (
                  <span key={s} className="fit-chip fit-chip--match">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {fit.missingSkills.length > 0 && (
            <div className="fit-skills-group">
              <span className="fit-skills-title">Skills to develop</span>
              <div className="fit-chips">
                {fit.missingSkills.map((s) => (
                  <span key={s} className="fit-chip fit-chip--gap">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
