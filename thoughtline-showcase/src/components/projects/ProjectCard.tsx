import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ProjectCard.css";

interface ProjectProps {
  id: number; // ✅ ADDED
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
      onClick={() => navigate(`/projects/${id}`)}  // ✅ ADDED
    >
      <span className={`status ${status.toLowerCase()}`}>
        {status}
      </span>

      <h3>{name}</h3>
      <p className="client">{client}</p>
      <p className="summary">{summary}</p>

      {teamMembers.length > 0 && (
        <div className="team">
          {teamMembers.join(", ")}
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
