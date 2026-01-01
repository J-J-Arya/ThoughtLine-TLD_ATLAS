// import ProjectCard from "./ProjectCard";
// import ProjectSkeleton from "./ProjectSkeleton";
// import "./ProjectGrid.css";

// interface Project {
//   id: number;
//   name: string;
//   client: string;
//   status: "Completed" | "Ongoing" | "Upcoming";
//   summary: string;
// }

// interface ProjectGridProps {
//   projects: Project[];
//   loading?: boolean;
// }

// const ProjectGrid = ({ projects, loading = false }: ProjectGridProps) => {
//   if (loading) {
//     return (
//       <div className="project-grid">
//         {Array.from({ length: 6 }).map((_, index) => (
//           <ProjectSkeleton key={index} />
//         ))}
//       </div>
//     );
//   }

//   if (!projects.length) {
//     return <p className="empty-state">No projects found</p>;
//   }

//   return (
//     <div className="project-grid">
//       {projects.map((project) => (
//         <ProjectCard
//           key={project.id}
//           name={project.name}
//           client={project.client}
//           status={project.status}
//           summary={project.summary}
//         />
//       ))}
//     </div>
//   );
// };

// export default ProjectGrid;

import ProjectCard from "./ProjectCard";
import ProjectSkeleton from "./ProjectSkeleton";
import type { Project } from "../../services/projectService";
import "./ProjectGrid.css";

interface ProjectGridProps {
  projects: Project[];
  loading?: boolean;
}

const ProjectGrid = ({ projects, loading = false }: ProjectGridProps) => {
  if (loading) {
    return (
      <div className="project-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!projects.length) {
    return <p className="empty-state">No projects found</p>;
  }

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          name={project.name}
          client={project.client}
          status={project.status}
          summary={project.summary}
          teamMembers={project.teamMembers}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
