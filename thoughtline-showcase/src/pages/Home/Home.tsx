import { useEffect, useState } from "react";

import Navbar from "../../components/layout/Navbar";
import PageWrapper from "../../components/layout/PageWrapper";
import ProjectGrid from "../../components/projects/ProjectGrid";
import AddProject from "../../components/projects/AddProject";

import { fetchProjects } from "../../services/projectService";
import "./Home.css";

export type ProjectStatus = "Completed" | "Ongoing" | "Upcoming";

export interface Project {
  id: number;
  name: string;
  client: string;
  status: ProjectStatus;
  summary: string;
}

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filtered, setFiltered] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "All">("All");

  // 🔹 NEW: modal control
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, status, projects]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
      setFiltered(data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...projects];

    if (status !== "All") {
      result = result.filter((p) => p.status === status);
    }

    if (search) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.client.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  };

  return (
    <PageWrapper>
      <Navbar search={search} onSearchChange={setSearch} />

      <div className="home-container">
        {/* TOP BAR */}
        <div className="home-header">
          <div className="filter-tabs">
            {["All", "Ongoing", "Completed", "Upcoming"].map((s) => (
              <button
                key={s}
                className={status === s ? "active" : ""}
                onClick={() => setStatus(s as any)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* ADD PROJECT BUTTON */}
          <button
            className="add-project-btn"
            onClick={() => setShowForm(true)}
          >
            + Add Project
          </button>
        </div>

        {/* PROJECT GRID */}
        <ProjectGrid projects={filtered} loading={loading} />

        {/* 🔹 ADD PROJECT OVERLAY */}
        {showForm && (
          <div className="overlay" onClick={() => setShowForm(false)}>
            <div
              className="overlay-content"
              onClick={(e) => e.stopPropagation()}
            >
              <AddProject closeForm={() => setShowForm(false)} />
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Home;

