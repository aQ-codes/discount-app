import express from "express";
import customerRegister from "../controllers/customer-controller.js";
import customerLogin from "../controllers/auth-controller.js";
import { calculateCartTotalController, getAllProductsController, getProductDetails } from "../controllers/product-controller.js";

const router = express.Router();

// Create a new customer
router.post('/register', customerRegister); 
router.post('/login', customerLogin ); 

// get all products
router.get('/products',  getAllProductsController); 
router.get('/product/:productId',  getProductDetails); 
router.post('/totalprice',  calculateCartTotalController); 

export default router;


