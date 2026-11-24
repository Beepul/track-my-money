import express from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware'
import { getUserPreference, updateUserPreference } from '../controllers/preference.controller'

const router = express.Router()


router.get('/', isAuthenticated, getUserPreference)
router.patch("/", isAuthenticated, updateUserPreference);

export default router