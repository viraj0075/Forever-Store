import express from "express"
import { validateCart, validateUpdateCart } from "../middlewares/cart.middleware.js";
import { addProductToCart, deleteCartProduct, getAllCartProduct, updateCartData } from "../controllers/cart.controllers.js";

const router = express.Router();

router.post("/add", validateCart, addProductToCart);
router.get("/", getAllCartProduct);
router.delete("/:id", deleteCartProduct);
router.put("/update", validateUpdateCart, updateCartData);

export default router;
