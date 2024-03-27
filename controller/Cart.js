import Cart from '../models/Cart.js';

export const AddToCart = async (req,res) => {
    try {
        const cart = new Cart(req.body);
        const doc = await cart.save();
    res.status(201).json(doc);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const FetchCartByUserId = async(req,res) => {
    const {userId} = req.querry;
    try{
        const cartItems = await Cart.find({user:userId}).populate('user').populate('product');
        res.status(200).json(cartItems);
    }catch(error){
        res.status(400).json(error);
    }
}

// export const updateCart = async(req,res) => {
//     const {id} = req.params;
//     try {
//         const 
//     } catch (error) {
//         res.status(400).json(error);
//     }
// }
