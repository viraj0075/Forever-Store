import { prisma } from "../config/db.js";
import ApiError from "../utils/Apierror.js"
import ApiResponse from "../utils/Apiresponse.js"

export const LoginUser = async (req, res) => {
    try {
        const { clerk_user_id } = req.body;
        console.log(clerk_user_id)

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
        return res.status(500).json(new ApiError(500, err.message))
    }
}

// export const registerUser = async
