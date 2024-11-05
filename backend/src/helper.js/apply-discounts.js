import { OFFERS } from '../constants/offers.js';

export const applyDiscounts = (cartItems, productsData) => {
  let total = 0;
  let discountsApplied = [];
  let subtotal = 0; //original total
  let pf4InCart = cartItems.some(item => item.productId === 'PF4'); // Check if PF4 is in the cart
  const purchasedProduct = new Set();


  cartItems.forEach(item => {
    const productData = productsData.find(p => p.id === item.productId);
    let itemTotal = productData.price * item.quantity;

    // Apply BOGO
    if (OFFERS.BOGO.product === item.productId && item.quantity >= 2) {
      const freeItems = Math.floor(item.quantity / 2);
      itemTotal -= productData.price * freeItems;
      discountsApplied.push(`BOGO applied on ${productData.name}`);
    }

    // Apply Bulk Discount
    if (OFFERS.BULK.product === item.productId && item.quantity >= OFFERS.BULK.minQty) {
      itemTotal = OFFERS.BULK.discountedPrice * item.quantity;
      discountsApplied.push(`Bulk discount on ${productData.name}`);
    }

    // Apply Combo Discount
    if (OFFERS.COMBO.products.includes(item.productId)) {
      const comboPartner = OFFERS.COMBO.products.find(pid => pid !== item.productId);
      if (cartItems.some(cartItem => cartItem.productId === comboPartner)) {
        itemTotal -= OFFERS.COMBO.discount;
        discountsApplied.push(`Combo discount applied for ${productData.name} with partner`);
      }
    }

    if (OFFERS.LOYALTY.products.includes(item.productId)) {
      const comboPartner = OFFERS.COMBO.products.find(pid => pid !== item.productId);
      if (cartItems.some(cartItem => cartItem.productId === comboPartner)) {
        itemTotal -= OFFERS.COMBO.discount;
        discountsApplied.push(`Combo discount applied for ${productData.name} with partner`);
      }
    }

    // Apply Seasonal Discount only to PF6 if PF4 is also in the cart
    if (item.productId === 'PF6' && pf4InCart) {
      const seasonalDiscount = itemTotal * (OFFERS.SEASONAL.discountPercent / 100);
      itemTotal -= seasonalDiscount;
      discountsApplied.push(`Seasonal discount of ${OFFERS.SEASONAL.discountPercent}% applied on ${productData.name}`);
    }

    subtotal += productData.price * item.quantity;
    total += itemTotal;
  });


  // Apply Cart Total Discount if subtotal exceeds $500
  if (subtotal >= OFFERS.CART_TOTAL.minCartTotal) {
    const cartDiscount = total * (OFFERS.CART_TOTAL.discountPercent / 100);
    total -= cartDiscount;
    discountsApplied.push(`Cart total discount of ${OFFERS.CART_TOTAL.discountPercent}% applied`);
  }


    // Apply Loyalty Discount if user has made 5 or more purchases
    if (purchasedProduct.length >= 5) {
      const loyaltyDiscount = total * 0.05; 
      total -= loyaltyDiscount;
      discountsApplied.push('Loyalty discount of 5% applied');
    }
  
    // Apply Diverse Product Discount
    const uniqueProductCount = purchasedProduct.size;
    if (uniqueProductCount === 5) {
      const diversePerfumeDiscount = total * 0.10; // 10% discount
      total -= diversePerfumeDiscount;
      discountsApplied.push('Diverse perfume discount of 10% applied for purchasing 5 different Product');
    } else if (uniqueProductCount === 6) {
      const diversePerfumeDiscount = total * 0.15; // 15% discount
      total -= diversePerfumeDiscount;
      discountsApplied.push('Diverse perfume discount of 15% applied for purchasing all 6 Product');
    }

  return { subtotal, total, discountsApplied };
};
