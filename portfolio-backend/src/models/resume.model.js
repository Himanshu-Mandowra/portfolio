import mongoose, { Schema } from "mongoose";

const resumeSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    firstName: String,
    lastName: String,
    email: String,
    altPhone: String,
    dateOfBirth: Date,
    gender: String,
    address: String,
    city: String,
    state: String,
    country: String,
    preferredLocation: String,
    linkedinUrl: String,
    githubUrl: String,
    portfolioUrl: String,

    skills: [String],
    languages: [String],
    certifications: [String],
    education: [String],
    workExperience: [String],
    projects: [String],
    achievements: [String],
    interests: [String],
    references: [String],

    profilePicture: String,

    resumeFile: {
      url: String,
      publicId: String,
      fileName: String,
      fileType: {
        type: String,
        enum: ["pdf", "doc", "docx"]
      },
      fileSize: Number
    },

    summary: String
  },
  {
    timestamps: true
  }
);

export const Resume = mongoose.model("Resume", resumeSchema);