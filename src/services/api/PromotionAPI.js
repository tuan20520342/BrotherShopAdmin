import * as UrlApi from '../url';
import baseRequest from './BaseRequest';

export const PromotionService = {
  getPromotionsList: () => {
    return baseRequest.get(UrlApi.URL_GET_PROMOTIONS);
  },
  getPromotionById: (id) => {
    return baseRequest.get(UrlApi.URL_PROMOTIONS_ID(id));
  },
  createPromotion: (data) => {
    return baseRequest.post(UrlApi.URL_CREATE_PROMOTION, data);
  },
  updatePromotion: (data) => {
    return baseRequest.put(UrlApi.URL_EDIT_PROMOTION(data.id), data);
  },
  deletePromotionById: (id) => {
    return baseRequest.get(UrlApi.URL_DELETE_PROMOTION(id));
  },
};
