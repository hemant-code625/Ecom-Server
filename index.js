import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productsRouter from './routes/Products.js'
import  categoriesRouter from './routes/Categories.js';
import brandsRouter     from './routes/Brands.js'; 
import cartRouter from './routes/Cart.js';
import userRouter from './routes/User.js';
import authRouter from './routes/Auth.js';
import cors from 'cors';   
const server = express();


//middlewares

server.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
dotenv.config();
server.use(express.json()); // to parse req.body
server.use('/products', productsRouter);
server.use('/categories', categoriesRouter)
server.use('/brands', brandsRouter)
server.use('/carts', cartRouter)
server.use('/users', userRouter);
server.use('/auth', authRouter);
async function main(){
    await mongoose.connect(`mongodb+srv://mongodb-ecommerce:${process.env.DB_PASS}@cluster0.pk2evkv.mongodb.net/ecommerce`)
    console.log('database connected')
}
main().catch(err=> console.log("Error in connecting with db: ",err));

server.get('/',(req, res)=>{
    res.json({status:'success'})
})



server.listen(8080, ()=>{
    console.log('server is live on port 8080')
})