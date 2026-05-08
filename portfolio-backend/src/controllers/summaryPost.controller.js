import axios from "axios";
import { Summary } from "../models/summary.model.js";

export const generateSummary = async (req, res) => {
    try {
        const data = req.body;
        const newSummary = await Summary.findOneAndUpdate({}, data, { new: true, upsert: true });

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