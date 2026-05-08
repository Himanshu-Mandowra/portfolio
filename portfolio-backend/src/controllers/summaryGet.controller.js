import axios from "axios";
import { Summary } from "../models/summary.model.js";

export const getSummary = async (req, res) => {
    try {
        const newSummary = await Summary.find();


        if (!newSummary) {
            return res.status(404).json({
                success: false,
                message: "summary not found",
            });
        }

        res.status(200).json({
            success: true,
            count: newSummary.length,
            data: newSummary,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching summary",
        });
    }
};