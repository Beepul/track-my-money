import express from 'express'
import userRouter from './user.routes'
import categoryRouter from './category.routes'
import transactionRouter from './transaction.routes'
import dashboardRouter from './dashboard.routes'
import reportRouter from "./report.routes"
import preferenceRouter from './preference.routes'

const router = express.Router()

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/transaction', transactionRouter)
router.use('/dashboard', dashboardRouter)
router.use('/report', reportRouter)
router.use('/preference', preferenceRouter)

export default router