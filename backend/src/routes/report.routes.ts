import express from "express"
import { getDownloadbleReport, getReportData } from "../controllers/report.controller"
import { isAuthenticated } from "../middlewares/auth.middleware"

const router = express.Router()

router.get('/', isAuthenticated, getReportData)
router.get('/downloadable', isAuthenticated, getDownloadbleReport)

export default router