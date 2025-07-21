import express, { NextFunction, Request, Response } from 'express'
import { validateBody } from '../validations/validator'
import { addCategorySchema } from '../validations/category.schema'
import { addCategory, deleteCategory, editCategory, getAllCategory, getCategoryById } from '../controllers/category.controller'
import { isAuthenticated } from '../middlewares/auth.middleware'
import path from 'path'
import { promises as fs } from 'fs'


const router = express.Router()

router.post('/', isAuthenticated ,validateBody(addCategorySchema), addCategory)
router.get('/', isAuthenticated, getAllCategory)
router.delete('/:id', isAuthenticated, deleteCategory)
router.put('/:id', isAuthenticated, editCategory)
router.get('/:id', isAuthenticated, getCategoryById)


router.get('/icon-list', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {

    const iconsPath = path.join(__dirname, '..', '..', 'uploads', 'catIcons')

    try{
        const files = await fs.readdir(iconsPath)

        res.status(200).json({
            result: files, 
            message: 'All category icons available on server',
            meta: null
        })

    }catch (error: any) {
        throw {
            message: error.message || 'Error fetching icon list',
            status: 400
        }
    }
})


export default router