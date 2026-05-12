import { MAX_IMAGE_UPLOAD } from "../contants/constants.js";

export const imageFields = [...Array(MAX_IMAGE_UPLOAD)].map((_, index) => ({
    name: `image${index + 1}`,
    maxCount: 1,
}));