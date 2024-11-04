import { applyDiscounts } from "../helper.js/apply-discounts";
import productRepository from "../repositories/product-repository";

export const getProductsByIdController = async (req, res) => {
  try {
    console.log('req.params:', req.params);  

    const { userId, productId } = req.params; 

    if (!productId) {
      return res.status(400).json({ message: 'productId not found' });
    }

    const product = await productRepository.getProduct(productId)

    applyDiscounts(products)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};