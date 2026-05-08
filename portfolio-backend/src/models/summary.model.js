import mongoose, {Schema} from "mongoose";

const summarySchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

export const Summary = mongoose.model("Summary", summarySchema);