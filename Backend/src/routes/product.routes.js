import express from "express"
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controllers.js";
import { fileUpload } from "../middlewares/multer.middleware.js";
import { imageFields } from "../config/imageFeild.js";
import { validateProduct } from "../middlewares/product.middleware.js";

const router = express.Router();


router.get("/list", getAllProducts);
router.get("/:id", getProductById);
router.post("/add", fileUpload.fields(imageFields), validateProduct, addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", fileUpload.fields(imageFields), validateProduct, updateProduct);

export default router;
