import express from "express"
import { LoginUser } from "../controllers/user.controllers.js"
import { validateLogin } from "../middlewares/validate.middleware.js"

const router = express.Router();

router.post("/login", validateLogin, LoginUser);
export default router;