const projectRepository = require("../repositories/projectRepository");

//Create a new project

exports.createProject = async (projectData) => {
  try {
    return await projectRepository.createProject(projectData);
  } catch (error) {
    console.error("Service Error (createProject):", error);
    throw error;
  }
};

//Get all projects
exports.getAllProjects = async () => {
  try {
    return await projectRepository.getAllProjects();
  } catch (error) {
    console.error("Service Error (getAllProjects):", error);
    throw error;
  }
};
