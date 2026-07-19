import { addProject, getAllProjects } from "../services/project.service.js";

export async function getProjects(req, res) {
  const projects = await getAllProjects();
  return res.status(200).json({
    success: true,
    data: projects,
    message: "Projects fetched successfully."
  });
}

export async function createProject(req, res) {
  const { title, description, link, image } = req.body;

  if (![title, description, link, image].every((field) => typeof field === "string" && field.trim())) {
    return res.status(400).json({
      success: false,
      message: "Title, description, link, and image are required."
    });
  }

  const project = await addProject({ title, description, link, image });

  return res.status(201).json({
    success: true,
    data: project,
    message: "Project created successfully."
  });
}
