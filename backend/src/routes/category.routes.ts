import express, { NextFunction, Request, Response } from 'express'
import { validateBody } from '../validations/validator'
import { addCategorySchema } from '../validations/category.schema'
import { addCategory, deleteCategory, editCategory, getAllCategory, getCategoryById, getIconList } from '../controllers/category.controller'
import { isAuthenticated } from '../middlewares/auth.middleware'
import path from 'path'
import { promises as fs } from 'fs'


const router = express.Router()

router.post('/', isAuthenticated ,validateBody(addCategorySchema), addCategory)
router.get('/', isAuthenticated, getAllCategory)
router.get('/icon-list', isAuthenticated, getIconList)
router.delete('/:id', isAuthenticated, deleteCategory)
router.put('/:id', isAuthenticated, editCategory)
router.get('/:id', isAuthenticated, getCategoryById)


export default router