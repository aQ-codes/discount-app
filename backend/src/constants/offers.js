export const OFFERS = {

  // Buy One Get One Free
  BOGO: { 
    type: 'BOGO', 
    product: 'PF1'  // Cool Water
  },
  
  // Bulk Discount: Discounted price if quantity threshold is met
  BULK: { 
    type: 'BULK', 
    product: 'PF2', // Lataffa Bulk Discount 
    minQty: 3, 
    discountedPrice: 75 
  },
  
  // Combo Discount: Discount for buying specific product pairs together
  COMBO: { 
    type: 'COMBO', 
    products: ['PF1', 'PF3'], // Cool Water + CK Combo 
    discount: 10  
  },
  
  // Limited Time Discount: Only active during a specific date range
  LIMITED_TIME: { 
    type: 'LIMITED_TIME', 
    product: 'PF4', // Armani Code 
    discount: 15,  // 15 off 
    dateRange: ['2024-11-01', '2024-11-30'] 
  },
  
  
  // Seasonal Discount: Holiday season or specific seasonal promotion
  SEASONAL: { 
    type: 'SEASONAL', 
    products: ['PF2', 'PF5'],  // Lataffa and Gucci Bloom Seasonal Discount
    discountPercent: 25,  // 25% discount 
    season: 'Winter' 
  },
  
  // Loyalty Discount: Extra discount for loyal customers
  LOYALTY: { 
    type: 'LOYALTY', 
    minPurchases: 5, // Applies if customer made 5+ previous purchases
    discountPercent: 10  // 10% discount on total cart
  },
  
  // Cart-Wide Discount: Discount if cart total exceeds a specific amount
  CART_TOTAL: { 
    type: 'CART_TOTAL', 
    minCartTotal: 500,  // $500 minimum cart total 
    discountPercent: 5 // 5% discount on the entire cart
  },
  

  // Anniversary Discount: Store-wide discount on the anniversary date
  ANNIVERSARY: { 
    type: 'ANNIVERSARY', 
    discountPercent: 10, 
    date: '2024-11-15' 
  },
  
};