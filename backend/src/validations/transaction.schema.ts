import Joi from "joi";

const addTransactionSchema = Joi.object({
    title: Joi.string().min(3).required(),
    amount: Joi.number().greater(0).required(),
    type: Joi.string().valid('INCOME','EXPENSE').required(),
    note: Joi.string().allow(""),
    categoryId: Joi.string().required(),
    date: Joi.string().isoDate().required()
})

const editTransactionSchema = Joi.object({
    title: Joi.string().min(3).required(),
    amount: Joi.number().greater(0).required(),
    type: Joi.string().valid('INCOME','EXPENSE').required(),
    note: Joi.string().allow(""),
    categoryId: Joi.string().required(),
    date: Joi.string().isoDate().required()
})

export {
    addTransactionSchema,
    editTransactionSchema
}