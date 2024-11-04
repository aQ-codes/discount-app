import dotenv from 'dotenv';
import productRepository from '../repositories/product-repository.js';
import { products } from '../constants/products.js';

dotenv.config();

const seedProducts = async () => {
  try {
    for (const product of products) {
      // Check if the product already exists
      const existingProduct = await productRepository.findProductById(product.id);
      if (!existingProduct) {
        await productRepository.addProduct(product);
        console.log(`Product ${product.name} created successfully`);
      } else {
        console.log(`Product ${product.name} already exists`);
      }
    }
  } catch (err) {
    console.error("Error when seeding products:", err);
  }
};

export default seedProducts;
