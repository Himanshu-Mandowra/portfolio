import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

import { v2 as cloudinary } from 'cloudinary';
import { fileURLToPath } from "url";


const uploadCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded successfully
        console.log("A file is iploaded on cloudinary",
            response.url

        )
        return reponse
    } catch (error) { 
        fs.unlinkSync(fileURLToPath);
        return null;
    }
}

export {uploadCloudinary}