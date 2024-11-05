export const OFFERS = {

  // Buy One Get One Free
  BOGO: { 
    type: 'BOGO', 
    product: 'PF1'  // Cool Water
  },
  
  // Bulk Discount
  BULK: { 
    type: 'BULK', 
    product: 'PF2', // Lataffa Bulk Discount 
    minQty: 3, 
    discountedPrice: 75 
  },
  
  // Combo Discount
  COMBO: { 
    type: 'COMBO', 
    products: ['PF1', 'PF3'], // Cool Water + CK Combo 
    discount: 10  
  },
  
  // Limited Time Discount
  LIMITED_TIME: { 
    type: 'LIMITED_TIME', 
    product: 'PF4', // Armani Code 
    discount: 15,  // 15 off 
    dateRange: ['2024-11-01', '2024-11-30'] 
  },
  
  
  // Seasonal Discount
  SEASONAL: { 
    type: 'SEASONAL', 
    products: ['PF4', 'PF5'],  
    discountPercent: 25,  // 25% discount 
  },
  
  // Loyalty Discount
  LOYALTY: { 
    type: 'LOYALTY', 
    minPurchases: 5, // Applies if customer made 5+ purchases
    discountPercent: 10  // 10% discount on total cart
  },
  
  // Cart-Wide Discount
  CART_TOTAL: { 
    type: 'CART_TOTAL', 
    minCartTotal: 500,  // $500 minimum cart total 
    discountPercent: 5 // 5% discount on the entire cart
  },

  // Anniversary Discount
  ANNIVERSARY: { 
    type: 'ANNIVERSARY', 
    discountPercent: 10, 
    date: '2024-11-15' 
  },
  
};