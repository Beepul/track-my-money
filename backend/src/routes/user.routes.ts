import express from 'express'
import { forgetPasswordSchema, loginUserSchema, registerUserSchema, resetPasswordSchema, updatePasswordSchema, updateUserSchema } from '../validations/user.schema'
import { forgetPassword, loginUser, logOutUser, refreshTokenCtrl, registerUser, resetPassword, updatePassword, updateUserInfo } from '../controllers/user.controller'
import { validateBody } from '../validations/validator'
import upload from '../middlewares/multer.middleware'
import { isAuthenticated } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/register', upload.single('image'), validateBody(registerUserSchema) , registerUser)
router.post('/login', validateBody(loginUserSchema), loginUser)
router.get('/log-out', logOutUser)
router.get('/refresh-token', refreshTokenCtrl)
router.put('/update-password', isAuthenticated, validateBody(updatePasswordSchema) , updatePassword)
router.put('/update-info',  isAuthenticated, upload.single('image'), validateBody(updateUserSchema) , updateUserInfo)
router.post('/forget-password', validateBody(forgetPasswordSchema), forgetPassword)
router.put('/reset-password/:token', validateBody(resetPasswordSchema), resetPassword)


export default router