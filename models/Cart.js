import mongoose, { Schema } from 'mongoose';

const cartSchema = new mongoose.Schema({
    quantity: {type: Number, required: true},
    product: {type: Schema.Types.ObjectId, ref:"Product" , required: true},
    user: {type: Number, ref:"User", required: true}    
});

const virtual = cartSchema.virtual('id');
virtual.get(function () {
  return this._id;
});
cartSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default mongoose.model('Cart', cartSchema);

// {
//     "title": "Microsoft Surface Laptop 4",
//     "description": "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
//     "price": 1499,
//     "discountPercentage": 10.23,
//     "rating": 4.43,
//     "stock": 68,
//     "brand": "Microsoft Surface",
//     "category": "laptops",
//     "thumbnail": "https://cdn.dummyjson.com/product-images/8/thumbnail.jpg",
//     "images": [
//       "https://cdn.dummyjson.com/product-images/8/1.jpg",
//       "https://cdn.dummyjson.com/product-images/8/2.jpg",
//       "https://cdn.dummyjson.com/product-images/8/3.jpg",
//       "https://cdn.dummyjson.com/product-images/8/4.jpg",
//       "https://cdn.dummyjson.com/product-images/8/thumbnail.jpg"
//     ],
//     "quantity": 1,
//     "productId": 8,
//     "user": 3,
//     "id": 1
//   }