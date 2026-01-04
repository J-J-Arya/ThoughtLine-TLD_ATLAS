// const projectService = require("../services/projectService");

// exports.createProject = async (req, res) => {
//   try {
//     const project = await projectService.createProject(req.body);
//     res.status(201).json(project);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to create project" });
//   }
// };

// exports.getAllProjects = async (req, res) => {
//   try {
//     const projects = await projectService.getAllProjects();
//     res.status(200).json(projects);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to fetch projects" });
//   }
// };
const projectService = require("../services/projectService");

/**
 * POST /projects
 */
exports.createProject = async (req, res) => {
  try {
    const { name, client, status, summary, teamMembers } = req.body;

    if (!name || !client) {
      return res.status(400).json({ message: "Project name and client are required" });
    }

    const project = await projectService.createProject({ name, client, status, summary, teamMembers });

    return res.status(201).json(project);
  } catch (error) {
    console.error("Controller Error (createProject):", error);
    return res.status(500).json({ message: "Failed to create project" });
  }
};

/**
 * GET /projects
 */
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    return res.status(200).json(projects);
  } catch (error) {
    console.error("Controller Error (getAllProjects):", error);
    return res.status(500).json({ message: "Failed to fetch projects" });
  }
};
