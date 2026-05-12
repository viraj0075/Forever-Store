import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import ApiError from "../utils/ApiError.js";

export const uploadToCloudinary = async (localPath, folderName) => {
    try {
        if (!localPath) return null;

        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: "auto",
            folder: folderName
        })
        fs.unlinkSync(localPath)
        return response.secure_url
    } catch (error) {
        console.log("This is the Cloudinary error message", error.message);
        if (fs.existsSync(localPath)) {
            fs.unlinkSync(localPath)
        }
        throw new ApiError(500, error.message);
    }
}