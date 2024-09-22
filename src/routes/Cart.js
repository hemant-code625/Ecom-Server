import express  from 'express';
import {AddToCart,FetchCartByUserId} from '../controller/Cart.js';

const router = express.Router();
router.post('/', AddToCart)
    .get('/', FetchCartByUserId);

export default router;