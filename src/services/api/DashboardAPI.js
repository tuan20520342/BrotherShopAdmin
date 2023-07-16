import baseRequest from './BaseRequest';
import * as UrlApi from '../url';

export const DashboardService = {
  getStatCardData: () => {
    return baseRequest.get(UrlApi.URL_GET_STAT_CARD_DATA);
  },
  getRevenue: (days) => {
    return baseRequest.get(`${UrlApi.URL_GET_REVENUE}/${days}`);
  },
  getBestSellerProducts: () => {
    return baseRequest.get(`${UrlApi.URL_GET_BEST_SELLER_PRODUCTS}`);
  },
  getPercentageCategories: () => {
    return baseRequest.get(`${UrlApi.URL_GET_PERCENTAGE_CATEGORIES}`);
  },
  getSoldQuantityProducts: () => {
    return baseRequest.get(UrlApi.URL_GET_SOLD_QUANTITY_PRODUCTS);
  },
  getTrendOfCategories: () => {
    return baseRequest.get(UrlApi.URL_GET_TREND_OF_CATEGORIES);
  },
};
