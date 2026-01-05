import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ProjectCard.css";

interface ProjectProps {
  id: number;
  name: string;
  client: string;
  status: "Completed" | "Ongoing" | "Upcoming";
  summary: string;
  teamMembers: string[]; 
}

const ProjectCard = ({
  id,
  name,
  client,
  status,
  summary,
  teamMembers, 
}: ProjectProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="project-card"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      onClick={() => navigate(`/projects/${id}`)}
    >
      {/* Status badge */}
      <span className={`status ${status.toLowerCase()}`}>
        {status}
      </span>

      {/* Project name */}
      <h3>{name}</h3>

      {/* ✅ Description FIRST */}
      <p className="summary">{summary}</p>

      {/* ✅ Client AFTER description */}
      <p className="client">{client}</p>
    </motion.div>
  );
};

export default ProjectCard;
