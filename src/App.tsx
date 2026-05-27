import { Sidebar } from "./components/Sidebar";
import { JobsPage } from "./components/JobsPage";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <JobsPage />
    </div>
  );
}
