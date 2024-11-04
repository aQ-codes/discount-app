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

  // Get product by ID
  async getProduct(id) {
    return await Product.findById(id); 
  }

  // Get products by an array of IDs
  async getProductsByIds(ids) {
    return await Product.find({ id: { $in: ids } });
  }
}

export default new ProductRepository();
