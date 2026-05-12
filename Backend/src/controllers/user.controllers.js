import { prisma } from "../config/db.js";
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

export const LoginUser = async (req, res) => {
    try {
        const { clerk_user_id } = req.body;
        const isUserAvailabe = await prisma.user.findUnique({
            where: {
                clerk_user_id
            }
        });
        if (!isUserAvailabe) {
            throw new ApiError(400, "User not found");
        }
        const data = {
            user: user.user_id
        }

        return res.status(200).json(new ApiResponse(200, data, "User logged in successfully"))

    } catch (err) {
        res.json({ message: err.message });
    }
}

export const registerUser = async (req, res) => {
    try {
        const { clerk_user_id } = req.body;
        const isUserAvailabe = await prisma.user.findUnique({
            where: {
                clerk_user_id
            }
        });
        if (isUserAvailabe) {
            throw new ApiError(400, "User already exists");
        }
        const newUser = await prisma.user.create({
            data: {
                clerk_user_id
            }
        })

        return res.status(200).json(new ApiResponse(200, newUser, "User registered successfully"))

    } catch (err) {
        res.json({ message: err.message });
    }
}

