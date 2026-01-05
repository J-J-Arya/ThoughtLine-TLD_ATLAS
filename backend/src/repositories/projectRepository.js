const db = require("../config/db");

//Create a new project with optional team members
exports.createProject = async (project) => {
  const { name, client, status = "Ongoing", summary = "", teamMembers = [] } = project;

  //Insert project
  const [result] = await db.promise().query(
    `INSERT INTO projects (name, client, status, summary)
     VALUES (?, ?, ?, ?)`,
    [name, client, status, summary]
  );

  const projectId = result.insertId;

  //Insert team members if any
  if (teamMembers.length > 0) {
    const values = teamMembers.map((member) => [projectId, member]);

    await db.promise().query(
      `INSERT INTO project_team_members (project_id, member_name)
       VALUES ?`,
      [values]
    );
  }

  //Return created project
  return {
    id: projectId,
    name,
    client,
    status,
    summary,
    teamMembers,
  };
};

//Fetch all projects with their team members
exports.getAllProjects = async () => {
  // Get all projects
  const [projects] = await db.promise().query(
    `SELECT * FROM projects ORDER BY created_at DESC`
  );

  // Attach team members to each project
  for (let project of projects) {
    const [members] = await db.promise().query(
      `SELECT member_name FROM project_team_members WHERE project_id = ?`,
      [project.id]
    );

    project.teamMembers = members.map((m) => m.member_name);
  }

  return projects;
};