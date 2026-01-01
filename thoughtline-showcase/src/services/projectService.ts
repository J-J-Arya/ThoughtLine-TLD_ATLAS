// import type { Project } from "../pages/Home/Home";

// import type { ProjectStatus } from "../pages/Home/Home";

// export const fetchProjects = async (): Promise<Project[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([
//         {
//           id: 1,
//           name: "AI Documentation Engine",
//           client: "Thoughtline Digital",
//           status: "Ongoing",
//           summary: "BART-powered summarization of internal docs."
//         },
//         {
//           id: 2,
//           name: "Client Insight Platform",
//           client: "FinTech Corp",
//           status: "Completed",
//           summary: "Automated public data extraction."
//         },
//         {
//           id: 3,
//           name: "Analytics Wrapped",
//           client: "Internal",
//           status: "Upcoming",
//           summary: "Yearly AI-generated insights & storytelling."
//         }
//       ]);
//     }, 1200);
//   });
// };

// 🔹 SINGLE SOURCE OF TRUTH
export type ProjectStatus = "Completed" | "Ongoing" | "Upcoming";

export interface Project {
  id: number;
  name: string;
  client: string;
  status: ProjectStatus;
  summary: string;
  teamMembers: string[]; // ✅ ALWAYS PRESENT
}

const API_BASE = "http://localhost:5000/api/projects";

export const fetchProjects = async (): Promise<Project[]> => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

export const createProject = async (project: {
  name: string;
  client: string;
  status: ProjectStatus;
  summary: string;
  teamMembers: string[];
}) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });

  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
};
