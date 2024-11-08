import { OFFERS } from '../constants/offers.js';
import { isLimitedTime } from './limited-time.js';

export const applyDiscounts = (cartItems, productsData) => {

  let discountedtotal = 0;
  let discountsApplied = [];
  let subtotal = 0; //original total
  let pf4 = cartItems.some(item => item.productId === 'PF4'); // Check if PF4 is in the cart
  // let limitedTime = false;
  let purchasedProducts = 5;
  const diffCartProducts = new Set(cartItems);
  const isAnniversary = true;
  let cartOfferMessage ='';
  let maxDiscount = 0

// console.log(purchasedProducts.length)

  cartItems.forEach(item => {

    const productData = productsData.find(p => p.id === item.productId);
    let itemTotal = productData.price * item.quantity;
    let itemMaxDiscount = 0;

    // console.log(productData)

    // BOGO 
    if (OFFERS.BOGO.product === item.productId && item.quantity >= 2) {
      const freeItems = Math.floor(item.quantity / 2);
      const bogoDiscount = productData.price * freeItems;
      itemTotal -= bogoDiscount;
      discountsApplied.push(`BOGO applied on ${productData.name}:Saved $${bogoDiscount}`);
    }

    // Bulk Discount
    if (OFFERS.BULK.product === item.productId && item.quantity >= OFFERS.BULK.minQty) {
      const  bulkDiscount = (productData.price - OFFERS.BULK.discountedPrice) * item.quantity;
      itemTotal -= bulkDiscount;
      itemMaxDiscount += bulkDiscount;
      discountsApplied.push(`Bulk discount on ${productData.name}:Saved $${bulkDiscount}`);
    }

    // Combo Discount
    if (OFFERS.COMBO.products.includes(item.productId)) {
      const comboPartnerId = OFFERS.COMBO.partner;
      const comboPartner = productsData.find(p => p.id === comboPartnerId);

      if(cartItems.some(item => item.productId === comboPartnerId)){
        const comboDiscount = (productData.price - OFFERS.COMBO.discountedPrice) * item.quantity
        itemTotal -= comboDiscount;
        itemMaxDiscount += comboDiscount;
        discountsApplied.push(`Combo discount applied for ${productData.name} with ${comboPartner.name}:Saved $${comboDiscount}`);
      } 
    }

    // Seasonal Discount 
    if (item.productId === OFFERS.SEASONAL.product && pf4) {
      const seasonalDiscount = itemTotal * (OFFERS.SEASONAL.discountPercent / 100);
      itemTotal -= seasonalDiscount;
      itemMaxDiscount += seasonalDiscount;
      discountsApplied.push(`Seasonal discount of ${OFFERS.SEASONAL.discountPercent}% applied on ${productData.name}:Saved: $${seasonalDiscount}`);
    }

    // limited time discount 

    if (isLimitedTime(item)) {
      // console.log("enterered limited time")
      const limitedTimeDiscount = itemTotal * (OFFERS.LIMITED_TIME.discountPercent/100) ;
      itemTotal -= limitedTimeDiscount;
      itemMaxDiscount += limitedTimeDiscount;
      discountsApplied.push(`Limited time discount of ${OFFERS.LIMITED_TIME.discountPercent}% applied on ${productData.name}:Saved : $${limitedTimeDiscount}`);
    }

    //tiered Discount

    if (OFFERS.TIERED.product === item.productId ) {
      if (item.quantity >= OFFERS.TIERED.tiers[0].minQty && item.quantity < OFFERS.TIERED.tiers[1].maxQty){
        const tieredDiscount = itemTotal * (OFFERS.TIERED.tiers[0].discountPercent/100)
        itemTotal -= tieredDiscount;
        itemMaxDiscount += tieredDiscount;
        discountsApplied.push(`TIERED Discount applied on ${productData.name}:Saved $${tieredDiscount}`)
      }
      else if (item.quantity >= OFFERS.TIERED.tiers[1].maxQty){
        const tieredDiscount = itemTotal * (OFFERS.TIERED.tiers[1].discountPercent/100);
        itemMaxDiscount += tieredDiscount;
        itemTotal -= tieredDiscount;
      discountsApplied.push(`TIERED Discount applied on ${productData.name}:Saved $${tieredDiscount}`)
      }
    }

      subtotal += productData.price * item.quantity; //original total
      discountedtotal += itemTotal;  //total after discounted 
  });
  
  // end of for each loop

  // cart level discounts 


  // Loyalty Discount 
  if (purchasedProducts >= 5) {
    
    console.log("entered purchased products")

    const loyaltyDiscount = discountedtotal * 0.05; 

    if (loyaltyDiscount > maxDiscount) {
      maxDiscount = loyaltyDiscount;
    }
    cartOfferMessage=`Loyalty discount of 5% applied: Saved $${loyaltyDiscount}`
  }


  // cart exceeds $500
  if (subtotal >= OFFERS.CART_TOTAL.minCartTotal) {

    const cartDiscount = discountedtotal * (OFFERS.CART_TOTAL.discountPercent / 100);

    if(cartDiscount>maxDiscount){
      maxDiscount = cartDiscount;
    }

    if(purchasedProducts >= 5){
      var complexFlag = true;
    }
      cartOfferMessage=`Cart total discount of ${OFFERS.CART_TOTAL.discountPercent}% applied:Saved $${cartDiscount}`
  }



  // Different Product Discounts

  const uniqueProductCount = diffCartProducts.size;

  console.log("different products: ",uniqueProductCount)

  if (uniqueProductCount === 5) {
    const diffPerfumeDiscount = discountedtotal * 0.10; // 10% discount
    if (diffPerfumeDiscount > maxDiscount){
      maxDiscount = diffPerfumeDiscount;
    }
    cartOfferMessage=`Diverse perfume discount of 10% applied for purchasing 5 different Product.Saved:$${diffPerfumeDiscount}`;

  } else if (uniqueProductCount === 6) {
    const diffPerfumeDiscount = discountedtotal * 0.15; // 15% discount
    if (diffPerfumeDiscount > maxDiscount){
      maxDiscount = diffPerfumeDiscount;
    }

    cartOfferMessage=`Different perfume discount of 15% applied for purchasing all 6 Product.Saved $${diffPerfumeDiscount}`;
  }


  //  Anniversary Discount

  if (isAnniversary) {
    const anniversaryDiscount = subtotal * (OFFERS.ANNIVERSARY.discountPercent / 100);
    if (anniversaryDiscount > maxDiscount){
      maxDiscount = anniversaryDiscount;
    }

    cartOfferMessage=`Anniversary discount of ${OFFERS.ANNIVERSARY.discountPercent}% applied.Saved : $${anniversaryDiscount}`;
  }


  discountedtotal -= maxDiscount;

  if(complexFlag){
    discountedtotal  -= discountedtotal*0.02;
    discountsApplied.push(`Additional 2% discount applied for entire cart for loyalty and cart-wide discount.Saved $${discountedtotal*0.02}`);
  }

  if(cartOfferMessage){
    discountsApplied.push(cartOfferMessage)
  }

  // console.log(typeof(discountedtotal))

  return { subtotal, discountedtotal, discountsApplied };
};

