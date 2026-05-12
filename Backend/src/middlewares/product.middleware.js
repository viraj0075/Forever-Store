import Joi from "joi";
import ApiError from "../utils/ApiError.js";

const productSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Product name cannot be an empty string',
        'any.required': 'Product name is required'
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Product description cannot be an empty string',
        'any.required': 'Product description is required'
    }),
    price: Joi.alternatives().try(Joi.number().positive(), Joi.string()).required().messages({
        'any.required': 'Price is required'
    }),
    category: Joi.string().required().messages({
        'string.empty': 'Category cannot be an empty string',
        'any.required': 'Category is required'
    }),
    subCategory: Joi.string().required().messages({
        'string.empty': 'Sub Category cannot be an empty string',
        'any.required': 'Sub Category is required'
    }),
    sizes: Joi.alternatives().try(
        Joi.array().items(Joi.string()),
        Joi.string()
    ).required().messages({
        'any.required': 'Sizes are required'
    }),
    bestseller: Joi.alternatives().try(Joi.boolean(), Joi.string()).optional()
});

export const validateProduct = (req, res, next) => {
    // Validate req.body against the schema
    // We use abortEarly: false to get all validation errors at once if there are multiple
    const { error, value } = productSchema.validate(req.body, { abortEarly: false });

    if (error) {
        // Extract the error messages
        const errorMessage = error.details.map(detail => detail.message).join(", ");
        // Alternatively, if you just want the first error message, you can use:
        // const errorMessage = error.details[0].message;

        return res.status(400).json(new ApiError(400, errorMessage));
    }

    // Replace req.body with the validated (and potentially type-cast) value
    req.body = value;
    next();
};
