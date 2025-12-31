// const projectRepository = require("../repositories/projectRepository");

// exports.createProject = async (data) => {
//   return await projectRepository.createProject({
//     name: data.name,
//     client: data.client,
//     status: data.status,
//     summary: data.summary,
//     teamMembers: data.teamMembers || [],
//   });
// };

// exports.getAllProjects = async () => {
//   return await projectRepository.getAllProjects();
// };

const projectRepository = require("../repositories/projectRepository");

/**
 * Create a new project
 */
exports.createProject = async (projectData) => {
  try {
    return await projectRepository.createProject(projectData);
  } catch (error) {
    console.error("Service Error (createProject):", error);
    throw error;
  }
};

/**
 * Get all projects
 */
exports.getAllProjects = async () => {
  try {
    return await projectRepository.getAllProjects();
  } catch (error) {
    console.error("Service Error (getAllProjects):", error);
    throw error;
  }
};
