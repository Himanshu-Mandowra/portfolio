import pdfParse from "pdf-parse";
import axios from "axios";
import { Resume } from "../models/resume.model.js";


export const uploadAndParseResume = async (
    req,
    res
) => {
    try {
        // Check file
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required",
            });
        }

        // Extract PDF Text
        const pdfData = await pdfParse(req.file.buffer);

        const extractedText = pdfData.text;

        // AI Request
        const aiResponse = await axios.post(
            process.env.GROQ_BASE_URL,
            {
                model: "llama-3.3-70b-versatile",

                messages: [
                    {
                        role: "system",
                        content:
                            "You are a resume parser AI. Extract resume data and return ONLY valid JSON.",
                    },

                    {
                        role: "user",
                        content: `
Extract these fields from resume:

fullName
phone
firstName
lastName
email
skills
education
workExperience
projects
certifications
linkedinUrl
githubUrl
portfolioUrl
languages
achievements

Return ONLY valid JSON.

Resume Text:
${extractedText}
            `,
                    },
                ],
            },

            {
                headers: {
                    "Content-Type": "application/json",

                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                },
            }
        );

        // AI Content
        const content =
            aiResponse.data.choices[0].message.content;

        // Parse JSON
        const cleanedContent = content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsedData = JSON.parse(cleanedContent);

        // Save MongoDB
        const resume = await Resume.create(parsedData);

        // Response
        return res.status(200).json({
            success: true,
            message: "Resume parsed successfully",
            data: resume,
        });
    } catch (error) {
        console.log(
            error.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: "Resume parsing failed",
        });
    }
};