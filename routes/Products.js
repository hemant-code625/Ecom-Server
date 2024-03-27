
import { Router } from 'express';
import { createProduct, fetchAllProducts, fetchProductById, updateProduct } from '../controller/Product.js';

const router = Router();
router.post('/', createProduct)
      .get('/', fetchAllProducts)
      .get('/:id', fetchProductById)
      .patch('/:id', updateProduct)

export default router;