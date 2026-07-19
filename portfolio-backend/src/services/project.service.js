import crypto from "node:crypto";
import { readJsonFile, writeJsonFile } from "../utils/fileStore.js";

const PROJECTS_FILE = "projects.json";

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
    image: project.image.trim(),
    createdAt: new Date().toISOString()
  };

  projects.unshift(newProject);
  await writeJsonFile(PROJECTS_FILE, projects);

  return newProject;
}
