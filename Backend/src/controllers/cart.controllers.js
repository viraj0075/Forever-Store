import { prisma } from "../config/db.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const addProductToCart = async (req, res) => {
    try {


        const { itemId, clerkId, size } = req.body;
        const isUser = await prisma.users.findUnique({
            where: {
                clerk_user_id: clerkId
            }
        });

        if (!isUser) return res.status(404).json(new ApiError(404, "User not found."));

        const isProduct = await prisma.products.findUnique({
            where: {
                id: itemId
            }
        })

        if (!isProduct) return res.status(404).json(new ApiError(404, "Product not found."));

        let cartData = isUser.cartData || {}
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        if (!cartData[itemId][size]) {
            cartData[itemId][size] = 0;
        }
        cartData[itemId][size] += 1;


        const updatedCartData = await prisma.users.update({
            where: {
                clerk_user_id: clerkId
            },
            data: {
                cartData
            }
        })

        return res.status(200).json(new ApiResponse(200, updatedCartData, "Product added to cart successfully"))
    }
    catch (error) {
        return res.status(500).json(new ApiError(500, error.message || "Error adding product to cart"))
    }
}


export const getAllCartProduct = async (req, res) => {
    try {
        const { clerkId } = req.body;
        const user = await prisma.users.findUnique({
            where: {
                clerk_user_id: clerkId
            }
        });
        if (!user) return res.status(404).json(new ApiError(404, "User not found"));
        return res.status(200).json(new ApiResponse(200, user.cartData || {}, "Cart data fetched successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiError(500, error.message || "Error fetching cart data"))
    }
}

export const deleteCartProduct = async (req, res) => {
    try {
        const { clerkId, itemId, size } = req.body;

        const user = await prisma.users.findUnique({
            where: {
                clerk_user_id: clerkId
            }
        });
        if (!user) return res.status(404).json(new ApiError(404, "User not found."));


        if (itemId) {
            const isProduct = await prisma.products.findUnique({
                where: { id: itemId }
            });

            if (!isProduct) {
                return res.status(404).json(
                    new ApiError(404, "Product not found.")
                );
            }
        }

        let cartData = user.cartData || {};

        if (!itemId || !size) {
            cartData = {}
        }
        else {
            delete cartData[itemId]?.[size];
            if (cartData[itemId] && Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        }

        const updatedCartData = await prisma.users.update({
            where: {
                clerk_user_id: clerkId
            },
            data: {
                cartData
            }
        });

        const message =
            !itemId || !size
                ? "Cart cleared successfully"
                : "Product removed from cart successfully";

        return res.status(200).json(new ApiResponse(200, updatedCartData, message))
    }
    catch (error) {
        return res.status(500).json(new ApiError(500, error.message || "Error deleting cart product"))
    }
}

export const updateCartData = async (req, res) => {
    try {
        const { clerkId, itemId, size, quantity } = req.body;

        const user = await prisma.users.findUnique({
            where: {
                clerk_user_id: clerkId,
            },
        });

        if (!user) {
            return res
                .status(404)
                .json(new ApiError(404, "User not found"));
        }

        const isProduct = await prisma.products.findUnique({
            where: {
                id: itemId,
            },
        });

        if (!isProduct) {
            return res
                .status(404)
                .json(new ApiError(404, "Product not found"));
        }

        const cartData = user.cartData || {};

        // Create product and size if they don't exist
        cartData[itemId] ??= {};
        cartData[itemId][size] ??= 0;

        // Remove item completely if quantity = 0
        if (quantity === 0) {
            delete cartData[itemId][size];
        } else {
            // Increase or decrease existing quantity
            cartData[itemId][size] += quantity;

            // Remove size if quantity becomes 0 or negative
            if (cartData[itemId][size] <= 0) {
                delete cartData[itemId][size];
            }
        }

        // Remove product if no sizes remain
        if (
            cartData[itemId] &&
            Object.keys(cartData[itemId]).length === 0
        ) {
            delete cartData[itemId];
        }

        const updatedCartData = await prisma.users.update({
            where: {
                clerk_user_id: clerkId,
            },
            data: {
                cartData,
            },
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                updatedCartData,
                "Cart data updated successfully"
            )
        );
    } catch (error) {
        return res.status(500).json(
            new ApiError(
                500,
                error.message || "Error updating cart data"
            )
        );
    }
};