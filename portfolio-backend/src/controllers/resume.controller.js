import { Resume } from "../models/resume.model.js";
import axios from "axios";

/**
 * CREATE / UPLOAD RESUME
 */
export const createResume = async (req, res) => {
  try {
    const data = req.body;

    const newResume = new Resume(data);
    await newResume.save();

    res.status(201).json({
      success: true,
      message: "Resume created successfully",
      data: newResume,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Error creating resume",
    });
  }
};