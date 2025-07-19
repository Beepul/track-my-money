import Joi from 'joi'

const addCategorySchema = Joi.object({
    name: Joi.string().min(3).required(),
    icon: Joi.string().min(3).required()
})

const updateCategorySchema = Joi.object({
    name: Joi.string().min(3).required(),
    icon: Joi.string().min(3).required()
})


export {
    addCategorySchema,
    updateCategorySchema
}