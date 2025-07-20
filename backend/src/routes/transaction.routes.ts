import express from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware'
import { validateBody } from '../validations/validator'
import { addTransactionSchema } from '../validations/transaction.schema'
import { addTransaction, getAllTransaction } from '../controllers/transaction.controller'


const router = express.Router()

router.post('/', isAuthenticated, validateBody(addTransactionSchema), addTransaction)
router.get('/', isAuthenticated, getAllTransaction)


export default router