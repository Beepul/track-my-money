import express, { NextFunction, Request, Response } from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware'
import { validateBody } from '../validations/validator'
import { addTransactionSchema, editTransactionSchema } from '../validations/transaction.schema'
import { addTransaction, deleteTransaction, editTransaction, getAllTransaction, getTransactionById } from '../controllers/transaction.controller'
import { uploadTransaction } from '../middlewares/multer.middleware'


const router = express.Router()
router.post(
  '/',
  uploadTransaction.single('receipt'), isAuthenticated,
  addTransaction
);

router.get('/', isAuthenticated, getAllTransaction)
router.delete('/:id', isAuthenticated, deleteTransaction)
router.get('/:id', isAuthenticated, getTransactionById)
router.put('/:id', isAuthenticated, uploadTransaction.single("receipt"), validateBody(editTransactionSchema), editTransaction)


export default router