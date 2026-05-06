import axios from "axios";
import { Resume } from "../models/resume.model.js";

export const generateSummary = async (req, res) => {
    try {
        const { id } = req.params;

        const resume = await Resume.findById(id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }

        // Build AI prompt from DB data
        const prompt = `
Name: ${resume.fullName}
Skills: ${resume.skills?.join(", ")}
Projects: ${resume.projects?.join(", ")}
Experience: ${resume.workExperience?.join(", ")}
Education: ${resume.education?.join(", ")}

Write a professional summary in one paragraph.
`;

        const aiRes = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
            {
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key": process.env.GEMINI_API_KEY,
                },
            }
        );

        const summary =
            aiRes?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        // Save summary
        resume.summary = summary;
        await resume.save();

        res.status(200).json({
            success: true,
            message: "Summary generated",
            summary,
        });
    } catch (error) {
        console.error(error.response?.data || error);
        res.status(500).json({
            success: false,
            message: "Error generating summary",
        });
    }
};