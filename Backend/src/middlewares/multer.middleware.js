import multer from "multer";

const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

export const fileUpload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true)
        } else {
            cb(new Error("Invalid file type"))
        }
    }
})