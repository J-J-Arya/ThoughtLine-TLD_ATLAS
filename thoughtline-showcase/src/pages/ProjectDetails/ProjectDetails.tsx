import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getProjectById,
  type Project,
} from "../../services/projectService";
import "./ProjectDetails.css";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getProjectById(Number(id)).then((data) => {
      setProject(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <p className="loading">Loading project details...</p>;
  }

  if (!project) {
    return (
      <div className="project-details-container">
        <div className="project-details-content">
          <h2>Project not found</h2>
          <button
            className="back-btn"
            onClick={() => navigate("/home")}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="project-details-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/*  Inner content wrapper */}
      <div className="project-details-content">
        
        {/* Header */}
        <div className="details-header">
          <h1>{project.name}</h1>

          <span className={`status ${project.status.toLowerCase()}`}>
            {project.status}
          </span>
        </div>

        {/* Info Card */}
        <div className="project-info">
          <p className="client">
            <strong>Client:</strong> {project.client}
          </p>

          <p className="summary">{project.summary}</p>

          <h3>Team Members</h3>
          <div className="team-list">
            {project.teamMembers.map((member, index) => (
              <span key={index} className="team-member">
                {member}
              </span>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <button
          className="back-btn"
          onClick={() => navigate("/home")}
        >
          ← Back to Projects
        </button>

      </div>
    </motion.div>
  );
};

export default ProjectDetails;
