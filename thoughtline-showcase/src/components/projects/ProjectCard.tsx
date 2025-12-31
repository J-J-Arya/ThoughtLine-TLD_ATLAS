import { motion } from "framer-motion";
import "./ProjectCard.css";

interface ProjectProps {
  name: string;
  client: string;
  status: "Completed" | "Ongoing" | "Upcoming";
  summary: string;
}

const ProjectCard = ({ name, client, status, summary }: ProjectProps) => {
  return (
    <motion.div
      className="project-card"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <span className={`status ${status.toLowerCase()}`}>
        {status}
      </span>

      <h3>{name}</h3>
      <p className="client">{client}</p>
      <p className="summary">{summary}</p>
    </motion.div>
  );
};

export default ProjectCard;

//testing