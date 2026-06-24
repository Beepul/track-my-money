import express from "express"
import { isAuthenticated } from "../middlewares/auth.middleware"
import { getDashboardCharts, getDashboardStats } from "../controllers/dashboard.controller"
const router = express.Router()

router.get('/stats/:period', isAuthenticated, getDashboardStats)
router.get('/charts/:period', isAuthenticated, getDashboardCharts)

export default router