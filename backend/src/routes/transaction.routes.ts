import express from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware'
import { validateBody } from '../validations/validator'
import { addTransactionSchema, editTransactionSchema } from '../validations/transaction.schema'
import { addTransaction, deleteTransaction, editTransaction, getAllTransaction, getTransactionById } from '../controllers/transaction.controller'


const router = express.Router()

router.post('/', isAuthenticated, validateBody(addTransactionSchema), addTransaction)
router.get('/', isAuthenticated, getAllTransaction)
router.delete('/:id', isAuthenticated, deleteTransaction)
router.get('/:id', isAuthenticated, getTransactionById)
router.put('/:id', isAuthenticated, validateBody(editTransactionSchema), editTransaction)


export default router