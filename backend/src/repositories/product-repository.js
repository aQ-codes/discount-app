import Product from "../models/product-model.js";

class ProductRepository {

  // Add product
  async addProduct(productData) {
    const newProduct = new Product(productData);
    return await newProduct.save();
  }

  // Get all products
  async getAllProducts() {
    return await Product.find(); 
  }

  // Get product by custom ID
  async getProduct(id) {
    return await Product.findOne({ id }); 
  }
  

  // Get products by an array of custom IDs
  async getProductsByIds(ids) {
    return await Product.find({ id: { $in: ids } }); 
  }

  async findProductById(productId) {
    return await Product.findOne({ id: productId }); 
  }
}

export default new ProductRepository();
