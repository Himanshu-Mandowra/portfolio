import express from "express";
import { createResume } from "../controllers/resume.controller.js";
import { updateResume } from "../controllers/updateResume.controller.js";
import { generateSummary } from "../controllers/GenerateSummary.controller.js";
import { getResume } from "../controllers/getResume.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/resume/create:
 *   post:
 *     summary: Create a new resume
 *     tags: [Resume]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               altPhone:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               preferredLocation:
 *                 type: string
 *               linkedinUrl:
 *                 type: string
 *               githubUrl:
 *                 type: string
 *               portfolioUrl:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               languages:
 *                 type: array
 *                 items:
 *                   type: string
 *               certifications:
 *                 type: array
 *                 items:
 *                   type: string
 *               education:
 *                 type: array
 *                 items:
 *                   type: string
 *               workExperience:
 *                 type: array
 *                 items:
 *                   type: string
 *               projects:
 *                 type: array
 *                 items:
 *                   type: string
 *               achievements:
 *                 type: array
 *                 items:
 *                   type: string
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *               references:
 *                 type: array
 *                 items:
 *                   type: string
 *               profilePicture:
 *                 type: string
 *               summary:
 *                 type: string
 *     responses:
 *       201:
 *         description: Resume created successfully
 */
router.post("/create", createResume);

/**
 * @swagger
 * /api/resume/update/{id}:
 *   put:
 *     summary: Update a resume
 *     tags: [Resume]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Resume updated successfully
 */
router.put("/update/:id", updateResume);

/**
 * @swagger
 * /api/resume/generate-summary/{id}:
 *   post:
 *     summary: Generate summary for a resume
 *     tags: [Resume]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Summary generated successfully
 */
router.post("/generate-summary/:id", generateSummary);

/**
 * @swagger
 * /api/resume/get:
 *   get:
 *     summary: Get a resumes
 *     tags: [Resume]
 *     responses:
 *       200:
 *         description: Resume found
 *       404:
 *         description: Resume not found
 */
router.get("/get", getResume);

export default router;