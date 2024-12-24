import Joi from "joi";

export const signupUserValidate = Joi.object({
  name: Joi.string().min(3).max(30).alphanum().required().messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 3 characters long.",
    "string.max": "Name must not exceed 30 characters.",
    "string.alphanum": "Name can only contain alphanumeric characters.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
    "string.empty": "Email is required.",
  }),
  password: Joi.string().min(6).max(14).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
    "string.max": "Password must not exceed 14 characters.",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "Confirm password is required.",
    "any.only": "Passwords do not match.",
  }),
});
