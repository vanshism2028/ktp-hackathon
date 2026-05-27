import { useApp } from "../context/AppContext";
import { getProfileCompleteness, getProfileSuggestions } from "../utils/fitInsights";
import "./ProfilePage.css";

export function ProfilePage() {
  const { profile, addSkill } = useApp();
  const completeness = getProfileCompleteness(profile);
  const suggestions = getProfileSuggestions(profile);

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>Profile</h1>
        <p className="profile-subtitle">
          A complete profile powers better fit scores and job matches
        </p>
      </header>

      <div className="profile-completeness">
        <div className="completeness-top">
          <span>Profile strength</span>
          <strong>{completeness}%</strong>
        </div>
        <div className="completeness-bar">
          <div className="completeness-fill" style={{ width: `${completeness}%` }} />
        </div>
        {completeness < 100 && (
          <p className="completeness-hint">
            Add skills and interests to unlock higher fit scores on more jobs.
          </p>
        )}
      </div>

      <section className="profile-section">
        <h2>About you</h2>
        <div className="profile-grid">
          <div>
            <span className="field-label">Name</span>
            <span>{profile.name}</span>
          </div>
          <div>
            <span className="field-label">School</span>
            <span>{profile.school}</span>
          </div>
          <div>
            <span className="field-label">Major</span>
            <span>{profile.major}</span>
          </div>
          <div>
            <span className="field-label">Graduation</span>
            <span>Class of {profile.graduationYear}</span>
          </div>
          <div>
            <span className="field-label">Work authorization</span>
            <span>{profile.workAuthorization}</span>
          </div>
        </div>
      </section>

      <section className="profile-section">
        <h2>Your skills</h2>
        <div className="skill-chips">
          {profile.skills.map((s) => (
            <span key={s} className="skill-chip skill-chip--owned">
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="profile-section profile-suggestions">
        <h2>Boost your fit score</h2>
        <p className="section-desc">
          Adding skills below improves match % on roles that require them.
        </p>
        {suggestions.map((s) => (
          <div key={s.skill} className="suggestion-card">
            <div className="suggestion-info">
              <strong>Add {s.skill}</strong>
              <span>
                +{s.avgFitBoost}% avg fit · {s.jobsUnlocked} job
                {s.jobsUnlocked !== 1 ? "s" : ""}
                {s.sampleEmployers.length > 0 &&
                  ` · ${s.sampleEmployers.join(", ")}`}
              </span>
            </div>
            <button type="button" className="btn-add-skill" onClick={() => addSkill(s.skill)}>
              Add skill
            </button>
          </div>
        ))}
        {suggestions.length === 0 && (
          <p className="section-desc">You&apos;ve added all common skills from open roles.</p>
        )}
      </section>

      <section className="profile-section">
        <h2>Career interests</h2>
        <div className="skill-chips">
          {profile.interests.map((i) => (
            <span key={i} className="skill-chip skill-chip--interest">
              {i}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
