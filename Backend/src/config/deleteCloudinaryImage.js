// utils/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import ApiError from "../utils/ApiError.js";

/**
 * Extract Cloudinary public_id from image URL
 *
 * Example:
 * https://res.cloudinary.com/demo/image/upload/v17155234/products/abc123.jpg
 *
 * Returns:
 * products/abc123
 */
export const getPublicIdFromUrl = (url) => {
    try {
        if (!url || typeof url !== "string") {
            throw new ApiError(400, "Invalid Cloudinary URL");
        }

        const parts = url.split("/");
        const uploadIndex = parts.findIndex((part) => part === "upload");

        if (uploadIndex === -1) {
            throw new ApiError(400, "Invalid Cloudinary URL format");
        }

        // Skip "upload" and version part (e.g. v17155234)
        const publicIdParts = parts.slice(uploadIndex + 2);

        if (publicIdParts.length === 0) {
            throw new ApiError(400, "Could not extract public_id");
        }

        const publicIdWithExtension = publicIdParts.join("/");

        // Remove file extension
        const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");

        return publicId;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(
            500,
            error.message || "Failed to extract Cloudinary public_id"
        );
    }
};

/**
 * Delete image from Cloudinary using image URL
 */
export const deleteFromCloudinary = async (url) => {
    try {
        if (!url) {
            throw new ApiError(400, "Image URL is required");
        }

        const publicId = getPublicIdFromUrl(url);

        const result = await cloudinary.uploader.destroy(publicId);

        // Cloudinary returns:
        // { result: "ok" } or { result: "not found" }

        if (result.result !== "ok" && result.result !== "not found") {
            throw new ApiError(
                500,
                `Failed to delete image from Cloudinary: ${result.result}`
            );
        }

        return result;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(
            500,
            error.message || "Failed to delete image from Cloudinary"
        );
    }
};