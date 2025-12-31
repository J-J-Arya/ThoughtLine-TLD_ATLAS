// const express = require("express");
// const router = express.Router();
// const projectController = require("../controllers/projectController");

// router.post("/", projectController.createProject);
// router.get("/", projectController.getAllProjects);

// module.exports = router;

const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectController");

// Create a new project
router.post("/", projectController.createProject);

// Get all projects
router.get("/", projectController.getAllProjects);

module.exports = router;
