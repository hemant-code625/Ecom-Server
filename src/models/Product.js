import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, required: true },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true, match: /.+\@.+\..+/ },
});

const dimensionsSchema = new mongoose.Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  depth: { type: Number, required: true },
});

const metaSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  barcode: { type: String, required: true },
  qrCode: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  availabilityStatus: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  stock: { type: Number, required: true },
  tags: { type: [String], required: true },
  brand: { type: String, required: true },
  sku: { type: String, required: true },
  weight: { type: Number, required: true },
  dimensions: { type: dimensionsSchema, required: true },
  warrantyInformation: { type: String, required: true },
  shippingInformation: { type: String, required: true },
  reviews: { type: [reviewSchema], default: [] },
  returnPolicy: { type: String, required: true },
  minimumOrderQuantity: { type: Number, required: true },
  meta: { type: metaSchema, required: true },
  images: { type: [[String]], required: true },
  thumbnail: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);
export default Product;

// {
//   id: 100,
//   title: 'Apple Airpods',
//   description: 'The Apple Airpods offer a seamless wireless audio experience. With easy pairing, high-quality sound, and Siri integration, they are perfect for on-the-go listening.',
//   category: 'mobile-accessories',
//   price: 129.99,
//   availabilityStatus: 'In Stock',
//   rating: 4.38,
//   stock: 93,
//   tags: [ 'electronics', 'wireless earphones' ],
//   brand: 'Apple',
//   sku: 'H76W8TSP',
//   weight: 3,
//   dimensions: { width: 22.62, height: 9.92, depth: 18.15 },
//   warrantyInformation: 'No warranty',
//   shippingInformation: 'Ships in 3-5 business days',
//   reviews: [
//     {
//       rating: 3,
//       comment: 'Waste of money!',
//       date: '2024-05-23T08:56:21.624Z',
//       reviewerName: 'Aaliyah Hanson',
//       reviewerEmail: 'aaliyah.hanson@x.dummyjson.com'
//     },
//     {
//       rating: 2,
//       comment: 'Waste of money!',
//       date: '2024-05-23T08:56:21.624Z',
//       reviewerName: 'Leah Gutierrez',
//       reviewerEmail: 'leah.gutierrez@x.dummyjson.com'
//     },
//     {
//       rating: 3,
//       comment: 'Not worth the price!',
//       date: '2024-05-23T08:56:21.624Z',
//       reviewerName: 'Jace Smith',
//       reviewerEmail: 'jace.smith@x.dummyjson.com'
//     }
//   ],
//   returnPolicy: '60 days return policy',
//   minimumOrderQuantity: 3,
//   meta: {
//     createdAt: '2024-05-23T08:56:21.624Z',
//     updatedAt: '2024-05-23T08:56:21.624Z',
//     barcode: '3925144121840',
//     qrCode: 'https://assets.dummyjson.com/public/qr-code.png'
//   },
//   images: [
//     [
//       'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/1.png',
//       'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/2.png',
//       'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/3.png'
//     ]
//   ],
//   thumbnail: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/thumbnail.png'
// }
