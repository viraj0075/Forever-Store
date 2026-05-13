import express from "express"
import { LoginUser, registerUser } from "../controllers/user.controllers.js"
import { validateLogin, validateSignIn } from "../middlewares/user.middleware.js"

const router = express.Router();

router.post("/signin", validateLogin, LoginUser);
router.post("/signup", validateSignIn, registerUser);
export default router;
