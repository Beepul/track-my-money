import express from 'express'
import { loginUserSchema, registerUserSchema, resetPasswordSchema, updateUserSchema } from '../validations/user.schema'
import { loginUser, logOutUser, refreshTokenCtrl, registerUser, resetPassword, updateUserInfo } from '../controllers/user.controller'
import { validateBody } from '../validations/validator'
import upload from '../middlewares/multer.middleware'
import { isAuthenticated } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/register', upload.single('image'), validateBody(registerUserSchema) , registerUser)
router.post('/login', validateBody(loginUserSchema), loginUser)
router.get('/log-out', logOutUser)
router.get('/refresh-token', refreshTokenCtrl)
router.put('/reset-password', isAuthenticated, validateBody(resetPasswordSchema) ,resetPassword)
router.put('/update-info',  isAuthenticated, upload.single('image'), validateBody(updateUserSchema) , updateUserInfo)


export default router