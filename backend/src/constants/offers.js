export const OFFERS = {

  // -----  item specific discounts ----------

  // Buy One Get One Free 
  BOGO: { 
    type: 'BOGO', 
    product: 'PF1'  // Cool Water
  },
  
  // Bulk Discount
  BULK: { 
    type: 'BULK', 
    product: 'PF2', // Lataffa 
    minQty: 3, 
    discountedPrice: 75 
  },

  // Limited Time Discount
  LIMITED_TIME: { 
    type: 'LIMITED_TIME', 
    product: 'PF4', // Armani Code 
    discountPercent: 15,  // 15%  
    dateRange: ['2024-11-01', '2024-11-30'] 
  },


  
  //----------  category or item combination discounts -----------

  // Combo Discount
  COMBO: { 
    type: 'COMBO', 
    products: ['PF3'], // Cool Water + CK Combo 
    partner:  'PF1',
    discountedPrice: 40// 10 Discount
  },
  
  //------------ --cart level discounts-------------------

  // Tiered Discount 
  TIERED: { 
    type: 'TIERED', 
    product: 'PF5',  // Gucci Bloom
    tiers: [ 
      { minQty: 2, discountPercent: 10 }, //10 %
      { maxQty: 4, discountPercent: 20 }  //20 %
    ]
  },
  
  // Seasonal Discount
  SEASONAL: { 
    type: 'SEASONAL', 
    product: 'PF6', 
    partner:'PF4',
    discountPercent: 25  // 25% off 
  },
  
  
  // Loyalty Discount
  LOYALTY: { 
    type: 'LOYALTY', 
    minPurchases: 5, 
    discountPercent: 10  
  },

  // Cart Total Discount
  CART_TOTAL: { 
    type: 'CART_TOTAL', 
    minCartTotal: 500,  
    discountPercent: 5  
  },

  ANNIVERSARY: { 
    type: 'ANNIVERSARY',  
    discountPercent: 20  
  },

  REFERRAL: { 
    type: 'REFERRAL', 
    discountPercent: 10,  // 10% off one-time on referred purchase
    minReferrals: 1      // Minimum referrals required
  },

  // Personalized Offer Discount
  PERSONALIZED: { 
    type: 'PERSONALIZED', 
    discountPercent: 20,   // 20% off 
  },

  // Exclusive Tier Discount
  EXCLUSIVE_TIER: { 
    type: 'EXCLUSIVE_TIER', 
    discountPercent: 10,   // 10% off 
  },

  
};
