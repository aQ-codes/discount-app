import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true }, 
  pic: { type: String, required: true }, 
});

const Product = mongoose.model("Product", productSchema);

export default Product;