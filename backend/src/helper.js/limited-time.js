import { OFFERS } from '../constants/offers.js';


export const isLimitedTime = (item) => {
  const currentDate = new Date();
  const startDate = new Date(OFFERS.LIMITED_TIME.dateRange[0]);
  const endDate = new Date(OFFERS.LIMITED_TIME.dateRange[1]);
  return item.productId === OFFERS.LIMITED_TIME.product && currentDate >= startDate && currentDate <= endDate;
};