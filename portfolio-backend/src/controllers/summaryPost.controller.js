import axios from "axios";
import { Summary } from "../models/summary.model.js";

export const generateSummary = async (req, res) => {
    try {
        const data = req.body;
        const newSummary = new Summary(data);
        await newSummary.save();

        res.status(201).json({
            success: true,
            message: "Summary created successfully",
            data: newSummary,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Error creating resume",
        });
    }
}