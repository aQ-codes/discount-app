import ProductRepository from '../repositories/product-repository.js';
import { applyDiscounts } from '../utils/discount-utils.js';

// Controller to get all products
export const getAllProductsController = async (req, res, next) => {
  try {
    const products = await ProductRepository.getAllProducts(); 
    if (!products || products.length === 0) {
      return res.status(400).json({ msg: 'Products not found' });
    }
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// Controller to get products by IDs
export const getProductsByIdsController = async (req, res, next) => {
  const { productIds } = req.body;
  try {
    const products = await ProductRepository.getProductsByIds(productIds);
    if (!products || products.length === 0) {
      return res.status(404).json({ msg: 'No products found for given IDs' });
    }
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// Controller to calculate cart total with discounts
export const calculateCartTotalController = async (req, res, next) => {
  const { cartItems } = req.body; // Array of { productId, quantity }
  try {
    const productIds = cartItems.map(item => item.productId);
    const products = await ProductRepository.getProductsByIds(productIds);
    
    // Apply discounts
    const { total, discountsApplied } = applyDiscounts(cartItems, products);

    return res.status(200).json({ total, discountsApplied });
  } catch (err) {
    next(err);
  }
};
