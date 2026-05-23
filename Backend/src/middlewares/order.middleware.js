import Joi from "joi";
import ApiError from "../utils/ApiError.js";

const orderSchema = Joi.object({

    clerkId: Joi.string()
        .required()
        .messages({
            "string.empty": "Clerk ID cannot be empty.",
            "any.required": "Clerk ID is required.",
        }),

    items: Joi.array()
        .items(
            Joi.object({
                productId: Joi.string()
                    .required()
                    .messages({
                        "string.empty": "Product ID cannot be empty.",
                        "any.required": "Product ID is required.",
                    }),

                quantity: Joi.number()
                    .integer()
                    .min(1)
                    .required()
                    .messages({
                        "number.base": "Quantity must be a number.",
                        "number.min": "Quantity must be at least 1.",
                        "any.required": "Quantity is required.",
                    }),
            })
        )
        .min(1)
        .required()
        .messages({
            "array.base": "Items must be an array.",
            "array.min": "At least one item is required.",
            "any.required": "Items are required.",
        }),

    address: Joi.object({

        fullName: Joi.string()
            .required()
            .messages({
                "string.empty": "Full name cannot be empty.",
                "any.required": "Full name is required.",
            }),

        phone: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .required()
            .messages({
                "string.pattern.base":
                    "Phone number must be 10 digits.",
                "any.required": "Phone number is required.",
            }),

        email: Joi.string()
            .email()
            .required()
            .messages({
                "string.email": "Invalid email format.",
                "any.required": "Email is required.",
            }),

        street: Joi.string()
            .required()
            .messages({
                "string.empty": "Street cannot be empty.",
                "any.required": "Street is required.",
            }),

        city: Joi.string()
            .required()
            .messages({
                "string.empty": "City cannot be empty.",
                "any.required": "City is required.",
            }),

        state: Joi.string()
            .required()
            .messages({
                "string.empty": "State cannot be empty.",
                "any.required": "State is required.",
            }),

        country: Joi.string()
            .required()
            .messages({
                "string.empty": "Country cannot be empty.",
                "any.required": "Country is required.",
            }),

        postalCode: Joi.string()
            .required()
            .messages({
                "string.empty": "Postal code cannot be empty.",
                "any.required": "Postal code is required.",
            }),

    })
        .required()
        .messages({
            "object.base": "Address must be an object.",
            "any.required": "Address is required.",
        }),

});

const validateOrder = (req, res, next) => {

    const { error, value } = orderSchema.validate(req.body, {
        abortEarly: false,
    });

    if (error) {

        const errorMessage = error.details
            .map((detail) => detail.message)
            .join(", ");

        return res
            .status(400)
            .json(new ApiError(400, errorMessage));
    }

    req.body = value;

    next();
};

export default validateOrder;