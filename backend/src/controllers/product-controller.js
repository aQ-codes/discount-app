import { applyDiscounts } from '../helper.js/apply-discounts.js';
import ProductRepository from '../repositories/product-repository.js';

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

//controller to get a particular product detail
export const getProductDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductRepository.getProduct(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
  console.log(err);

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
  console.log("entered cart controller")
  const { cartItems } = req.body; // Array of { productId, quantity }
  console.log(cartItems)
  try {
    const productIds = cartItems.map(item => item.productId);
    const products = await ProductRepository.getProductsByIds(productIds);
    console.log(products)
    
    // Apply discounts
    const {subtotal, total, discountsApplied } = applyDiscounts(cartItems, products);

    console.log(total,subtotal)

    return res.status(200).json({ total, discountsApplied , subtotal});
  } catch (err) {
    next(err);
  }
};
