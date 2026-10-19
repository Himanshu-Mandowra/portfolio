import crypto from "node:crypto";
import { readJsonFile, writeJsonFile } from "../utils/fileStore.js";

const PROJECTS_FILE = "projects.json";

function normalizeTechStack(techStack) {
  if (Array.isArray(techStack)) {
    return techStack.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof techStack === "string" && techStack.trim()) {
    return techStack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return ["React", "Node.js", "Tailwind CSS"];
}

export async function getAllProjects() {
  const projects = await readJsonFile(PROJECTS_FILE, []);
  return projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function addProject(project) {
  const projects = await getAllProjects();
  const newProject = {
    _id: crypto.randomUUID(),
    title: project.title.trim(),
    description: project.description.trim(),
    link: project.link.trim(),
    codeLink: project.codeLink ? project.codeLink.trim() : "",
    image: project.image.trim(),
    category: project.category ? project.category.trim() : "FULL-STACK",
    clearance: project.clearance ? project.clearance.trim() : "LEVEL 4",
    techStack: normalizeTechStack(project.techStack),
    createdAt: new Date().toISOString()
  };

  projects.unshift(newProject);
  await writeJsonFile(PROJECTS_FILE, projects);

  return newProject;
}

export async function updateProjectById(id, updates) {
  const projects = await getAllProjects();
  const index = projects.findIndex((p) => p._id === id);

  if (index === -1) {
    return null;
  }

  const existing = projects[index];
  const updatedProject = {
    ...existing,
    title: updates.title !== undefined ? updates.title.trim() : existing.title,
    description:
      updates.description !== undefined
        ? updates.description.trim()
        : existing.description,
    link: updates.link !== undefined ? updates.link.trim() : existing.link,
    codeLink:
      updates.codeLink !== undefined
        ? updates.codeLink.trim()
        : existing.codeLink || "",
    image: updates.image !== undefined ? updates.image.trim() : existing.image,
    category:
      updates.category !== undefined
        ? updates.category.trim()
        : existing.category || "FULL-STACK",
    clearance:
      updates.clearance !== undefined
        ? updates.clearance.trim()
        : existing.clearance || "LEVEL 4",
    techStack:
      updates.techStack !== undefined
        ? normalizeTechStack(updates.techStack)
        : existing.techStack || ["React", "Node.js"],
    updatedAt: new Date().toISOString()
  };

  projects[index] = updatedProject;
  await writeJsonFile(PROJECTS_FILE, projects);

  return updatedProject;
}

export async function deleteProjectById(id) {
  const projects = await getAllProjects();
  const index = projects.findIndex((p) => p._id === id);

  if (index === -1) {
    return null;
  }

  const [deleted] = projects.splice(index, 1);
  await writeJsonFile(PROJECTS_FILE, projects);

  return deleted;
}

