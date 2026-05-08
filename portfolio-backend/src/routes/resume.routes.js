import express from "express";
import { createResume } from "../controllers/resume.controller.js";
import { updateResume } from "../controllers/updateResume.controller.js";
import { getResume } from "../controllers/getResume.controller.js";
import { generateSummary } from "../controllers/summaryPost.controller.js";
import { getSummary } from "../controllers/summaryGet.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/resume/create:
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
 * /api/v1/resume/update/{id}:
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
 * /api/v1/resume/get:
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
/**
 * @swagger
 * /api/v1/resume/summary:
 *   post:
 *     summary: Generate a resume summary
 *     tags: [Summary]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Frontend developer with React and Node.js experience"
 *     responses:
 *       200:
 *         description: Summary generated successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Summary generation failed
 */
router.post("/summary", generateSummary);
/**
 * @swagger
 * /api/v1/resume/get/summary:
 *   get:
 *     summary: Get Summary
 *     tags: [Summary]
 *     responses:
 *       200:
 *         description: Summary generated successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Summary generation failed
 */
router.get("/get/summary", getSummary);

export default router;