import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //Coudinary url
            required: [true, "The video is required"]
        },
        thumbnail: {
            type: String, //Coudinary url
            required: [true, "The Thumbnail is required"]
        },
        title: {
            type: String,
            required: [true, "The Title is required"]
        },
        description: {
            type: String,
            required: [true, "The Description is required"]
        },
        duration: {
            type: Number,
            required: [true, "The Duration is required"]
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)