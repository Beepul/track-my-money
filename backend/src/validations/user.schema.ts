import Joi from "joi";


const registerUserSchema = Joi.object({
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
})

const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
})

const oldPasswordSchema = Joi.object({
    oldPassword: Joi.string().required(),
})

const newPasswordSchema = Joi.object({
    newPassword: Joi.string()
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)
        .required(),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
})

const updateUserSchema = Joi.object({
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(3).required(),
})

const forgetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
})

const resetPasswordSchema = Joi.object({
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
})


export {
    registerUserSchema,
    loginUserSchema,
    oldPasswordSchema,
    newPasswordSchema,
    updateUserSchema,
    forgetPasswordSchema,
    resetPasswordSchema
}