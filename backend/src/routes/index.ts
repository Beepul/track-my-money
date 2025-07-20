import express from 'express'
import userRouter from './user.routes'
import categoryRouter from './category.routes'
import transactionRouter from './transaction.routes'

const router = express.Router()

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/transaction', transactionRouter)

export default router