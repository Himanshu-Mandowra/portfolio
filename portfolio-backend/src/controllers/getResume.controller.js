import { Resume } from "../models/resume.model.js";


export const getResume = async (req, res) => {
  try {
    const resume = await Resume.find();

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      count: resume.length,
      data: resume,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching resume",
    });
  }
};