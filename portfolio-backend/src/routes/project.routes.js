import { Router } from "express";
import { createProject, getProjects } from "../controllers/project.controller.js";
import { requireAdminAuth } from "../middlewares/adminAuth.middleware.js";

const router = Router();

router.get("/", getProjects);
router.post("/", requireAdminAuth, createProject);

export default router;
