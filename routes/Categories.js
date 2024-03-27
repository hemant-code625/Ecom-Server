import { Router } from 'express';
import { fetchCategories, createCategory } from '../controller/Category.js';

const router = Router();
router.get('/', fetchCategories).post('/',createCategory)

export default router;