import Joi from "joi";
import ApiError from "../utils/ApiError.js";

const CartSchema = Joi.object(
    {
        itemId: Joi.string().required().messages({
            "string.empty": 'Product ID cannot be empty.',
            "any.required": "Product ID is required"
        }),
        clerkId: Joi.string().required().messages({
            "string.empty": 'Clerk ID cannot be empty.',
            "any.required": "Clerk ID is required"
        }),
        size: Joi.string().required().messages({
            "string.empty": 'Size cannot be empty.',
            "any.required": "Size is required"
        })
    }
);

const updateCartSchema = Joi.object({
    clerkId: Joi.string().required().messages({
        "string.empty": "User ID cannot be empty.",
        "any.required": "User ID is required",
    }),

    itemId: Joi.string().required().messages({
        "string.empty": "Product ID cannot be empty.",
        "any.required": "Product ID is required",
    }),

    size: Joi.string().required().messages({
        "string.empty": "Size cannot be empty.",
        "any.required": "Size is required",
    }),

    quantity: Joi.number().integer().min(0).required().messages({
        "number.base": "Quantity must be a number.",
        "number.integer": "Quantity must be an integer.",
        "number.min": "Quantity cannot be negative.",
        "any.required": "Quantity is required",
    }),
});

export const validateCart = (req, res, next) => {
    const { error, value } = CartSchema.validate(req.body);

    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(", ");
        return res.status(400).json(new ApiError(400, errorMessage));
    }

    req.body = value;
    next();
}


export const validateUpdateCart = (req, res, next) => {
    const { error, value } = updateCartSchema.validate(req.body);

    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(", ");
        return res.status(400).json(new ApiError(400, errorMessage));
    }

    req.body = value;
    next();
}