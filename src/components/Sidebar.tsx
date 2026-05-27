import type { ReactNode } from "react";
import "./Sidebar.css";

const navItems = [
  { id: "home", label: "Home", icon: "home", active: false },
  { id: "jobs", label: "Jobs", icon: "briefcase", active: true },
  { id: "events", label: "Events", icon: "calendar", active: false },
  { id: "messages", label: "Messages", icon: "message", active: false },
  { id: "career", label: "Career Center", icon: "building", active: false },
  { id: "profile", label: "Profile", icon: "user", active: false },
];

function NavIcon({ type }: { type: string }) {
  const paths: Record<string, ReactNode> = {
    home: (
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1V9.5z" />
    ),
    briefcase: (
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2h4a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1h4zm2-2h4V7h-4V5z" />
    ),
    calendar: (
      <path d="M6 2v2H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2h-4V2H10v2zM4 8h16v10H4V8z" />
    ),
    message: (
      <path d="M4 4h16a1 1 0 011 1v10a1 1 0 01-1 1H6l-4 3V5a1 1 0 011-1z" />
    ),
    building: (
      <path d="M4 20V6l8-4 8 4v14H4zm4-2h2v-4H8v4zm4 0h2v-6h-2v6zm4 0h2v-8h-2v8z" />
    ),
    user: (
      <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm-8 8a8 8 0 0116 0H4z" />
    ),
  };
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      {paths[type]}
    </svg>
  );
}

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-text">handshake</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className={`sidebar-link ${item.active ? "sidebar-link--active" : ""}`}
            onClick={(e) => e.preventDefault()}
          >
            <NavIcon type={item.icon} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-avatar">AC</div>
      </div>
    </aside>
  );
}
