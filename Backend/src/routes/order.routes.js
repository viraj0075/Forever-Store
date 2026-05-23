import express from "express";
import { createOrder, listAllOrder, deleteOrders } from "../controllers/order.controllers.js";
import validateOrder from "../middlewares/order.middleware.js";

const router = express.Router();

router.post("/create", validateOrder, createOrder);
router.get("/", listAllOrder);
router.delete("/:orderId", deleteOrders);

export default router;
