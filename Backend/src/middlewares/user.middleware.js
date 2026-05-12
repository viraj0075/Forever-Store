import Joi from "joi";
import ApiError from "../utils/ApiError.js";

const loginSchema = Joi.object({
    clerk_user_id: Joi.string().required().messages({
        'string.empty': 'Clerk User ID cannot be an empty string',
        'any.required': 'Clerk User ID is required'
    })
});
const signInSchema = Joi.object(
    {
        clerk_user_id: Joi.string().required().messages({
            'string.empty': 'Clerk User ID cannot be an empty string',
            'any.required': 'Clerk User ID is required'
        })
    }
)

export const validateLogin = (req, res, next) => {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
        return next(new ApiError(400, error.details[0].message));
    }

    req.body = value;
    next();
};

export const validateSignIn = (req, res, next) => {
    const { error, value } = signInSchema.validate(req.body);
    if (error) {
        return next(new ApiError(400, error.details[0].message));
    }
    req.body = value;
    next();
}
