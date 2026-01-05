export type ProjectStatus = "Completed" | "Ongoing" | "Upcoming";

export interface Project {
  id: number;
  name: string;
  client: string;
  status: ProjectStatus;
  summary: string;
  teamMembers: string[]; 
}

//  – mock in-memory data
let mockProjects: Project[] = [
  {
    id: 1,
    name: "TLD Atlas",
    client: "Thoughtline Digital",
    status: "Ongoing",
    summary: "Domain intelligence and analytics platform.",
    teamMembers: ["Athul", "Arya", "Vishnu"],
  },
  {
    id: 2,
    name: "Internal Dashboard",
    client: "Thoughtline Digital",
    status: "Completed",
    summary: "Admin dashboard for internal tracking.",
    teamMembers: ["Athul", "Arya"],
  },
];

export const fetchProjects = async (): Promise<Project[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...mockProjects]);
    }, 500);
  });
};

export const createProject = async (project: {
  name: string;
  client: string;
  status: ProjectStatus;
  summary: string;
  teamMembers: string[];
}) => {
  return new Promise<Project>(resolve => {
    setTimeout(() => {
      const newProject: Project = {
        id: Date.now(),
        ...project,
      };

      mockProjects.push(newProject);
      resolve(newProject);
    }, 500);
  });
};

export const getProjectById = async (
  id: number
): Promise<Project | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const project = mockProjects.find(p => p.id === id) || null;
      resolve(project);
    }, 300);
  });
};







// export type ProjectStatus = "Completed" | "Ongoing" | "Upcoming";

// export interface Project {
//   id: number;
//   name: string;
//   client: string;
//   status: ProjectStatus;
//   summary: string;
//   teamMembers: string[]; // ✅ ALWAYS PRESENT
// }

// const API_BASE = "http://localhost:5000/api/projects";

// export const fetchProjects = async (): Promise<Project[]> => {
//   const res = await fetch(API_BASE);
//   if (!res.ok) throw new Error("Failed to fetch projects");
//   return res.json();
// };

// export const createProject = async (project: {
//   name: string;
//   client: string;
//   status: ProjectStatus;
//   summary: string;
//   teamMembers: string[];
// }) => {
//   const res = await fetch(API_BASE, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(project),
//   });

//   if (!res.ok) throw new Error("Failed to create project");
//   return res.json();
// };
