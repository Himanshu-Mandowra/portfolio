import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject
} from "../controllers/project.controller.js";
import { requireAdminAuth } from "../middlewares/adminAuth.middleware.js";

const router = Router();

router.get("/", getProjects);
router.post("/", requireAdminAuth, createProject);
router.put("/:id", requireAdminAuth, updateProject);
router.delete("/:id", requireAdminAuth, deleteProject);

export default router;

