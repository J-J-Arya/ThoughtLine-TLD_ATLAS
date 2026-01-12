import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ADDED

import Navbar from "../../components/layout/Navbar";
import PageWrapper from "../../components/layout/PageWrapper";
import ProjectGrid from "../../components/projects/ProjectGrid";

import { fetchProjects } from "../../services/projectService";
import type { Project, ProjectStatus } from "../../services/projectService";

import "./Home.css";

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filtered, setFiltered] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "All">("All");

  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate(); // ✅ ADDED

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
      const normalized = data.map((p) => ({
        ...p,
        teamMembers: p.teamMembers ?? [],
      }));
      setProjects(normalized);
      setFiltered(normalized);
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

    if (search.trim()) {
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
      <Navbar />

      <div className="home-container">
        {/* TOP BAR */}
        <div className="home-header">
          <div className="filter-tabs">
            {["All", "Ongoing", "Completed", "Upcoming"].map((s) => (
              <button
                key={s}
                className={status === s ? "active" : ""}
                onClick={() => setStatus(s as ProjectStatus | "All")}
              >
                {s}
              </button>
            ))}
          </div>

          {/* SEARCH BAR */}
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="project-search-input header-search"
          />

          {/* ADD PROJECT BUTTON */}
          <button
            className="add-project-btn"
            onClick={() => navigate("/add-project")} // ✅ CHANGED
          >
            + Add Project
          </button>
        </div>

        {/* PROJECT GRID */}
        <ProjectGrid projects={filtered} loading={loading} />

        {/* ADD PROJECT OVERLAY (UNCHANGED, JUST NOT USED NOW) */}
        {showForm && (
          <div className="overlay" onClick={() => setShowForm(false)}>
            <div
              className="overlay-content"
              onClick={(e) => e.stopPropagation()}
            >
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Home;
