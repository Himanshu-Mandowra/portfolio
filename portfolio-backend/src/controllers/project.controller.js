import {
  addProject,
  deleteProjectById,
  getAllProjects,
  updateProjectById
} from "../services/project.service.js";

export async function getProjects(req, res) {
  const projects = await getAllProjects();
  return res.status(200).json({
    success: true,
    data: projects,
    message: "Projects fetched successfully."
  });
}

export async function createProject(req, res) {
  const { title, description, link, codeLink, image, category, clearance, techStack } = req.body;

  if (![title, description, link, image].every((field) => typeof field === "string" && field.trim())) {
    return res.status(400).json({
      success: false,
      message: "Title, description, link, and image are required."
    });
  }

  const project = await addProject({
    title,
    description,
    link,
    codeLink,
    image,
    category,
    clearance,
    techStack
  });

  return res.status(201).json({
    success: true,
    data: project,
    message: "Project created successfully."
  });
}

export async function updateProject(req, res) {
  const { id } = req.params;
  const { title, description, link, codeLink, image, category, clearance, techStack } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Project ID is required."
    });
  }

  const updated = await updateProjectById(id, {
    title,
    description,
    link,
    codeLink,
    image,
    category,
    clearance,
    techStack
  });

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: "Project not found."
    });
  }

  return res.status(200).json({
    success: true,
    data: updated,
    message: "Project updated successfully."
  });
}

export async function deleteProject(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Project ID is required."
    });
  }

  const deleted = await deleteProjectById(id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Project not found."
    });
  }

  return res.status(200).json({
    success: true,
    data: deleted,
    message: "Project deleted successfully."
  });
}

