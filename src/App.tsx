import { AppProvider, useApp } from "./context/AppContext";
import { Sidebar } from "./components/Sidebar";
import { JobsPage } from "./components/JobsPage";
import { ApplicationTracker } from "./components/ApplicationTracker";
import { MessagesPage } from "./components/MessagesPage";
import { ProfilePage } from "./components/ProfilePage";
import "./App.css";

function MainContent() {
  const { page } = useApp();

  switch (page) {
    case "applications":
      return <ApplicationTracker />;
    case "messages":
      return <MessagesPage />;
    case "profile":
      return <ProfilePage />;
    case "jobs":
    default:
      return <JobsPage />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <div className="app">
        <Sidebar />
        <MainContent />
      </div>
    </AppProvider>
  );
}
