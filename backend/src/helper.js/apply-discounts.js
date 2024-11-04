import { OFFERS } from '../constants/OFFERS';
import { products } from '../constants/products';

export const applyDiscounts = (cartItems, productsData) => {
  let total = 0;
  let discountsApplied = [];

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



    total += itemTotal;
  });

  return { total, discountsApplied };
};
