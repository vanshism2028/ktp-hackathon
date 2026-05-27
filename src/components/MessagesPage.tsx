import { messages } from "../data/messages";
import { jobs } from "../data/jobs";
import { calculateFit } from "../utils/fitScore";
import { useApp } from "../context/AppContext";
import "./MessagesPage.css";

export function MessagesPage() {
  const { profile } = useApp();
  const sorted = [...messages].sort((a, b) => {
    if (a.priority === "high" && b.priority !== "high") return -1;
    if (b.priority === "high" && a.priority !== "high") return 1;
    return 0;
  });

  return (
    <div className="messages-page">
      <header className="messages-header">
        <h1>Messages</h1>
        <p className="messages-subtitle">
          Priority inbox — conversations tied to saved jobs and high-fit roles first
        </p>
      </header>

      <div className="messages-list">
        {sorted.map((msg) => {
          const job = msg.relatedJobId ? jobs.find((j) => j.id === msg.relatedJobId) : null;
          const fit = job ? calculateFit(job, profile).overall : null;

          return (
            <article
              key={msg.id}
              className={`message-card ${msg.priority === "high" ? "message-card--priority" : ""}`}
            >
              {msg.priority === "high" && <span className="priority-badge">Priority</span>}
              <div className="message-top">
                <strong>{msg.from}</strong>
                <span className="message-time">{msg.time}</span>
              </div>
              <p className="message-employer">{msg.employer}</p>
              <h3>{msg.subject}</h3>
              <p className="message-preview">{msg.preview}</p>
              {fit !== null && (
                <span className="message-fit">Related job · {fit}% fit</span>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
