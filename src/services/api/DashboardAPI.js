import baseRequest from './BaseRequest';
import * as UrlApi from '../url';

export const DashboardService = {
  getStatCardData: () => {
    return baseRequest.get(UrlApi.URL_GET_STAT_CARD_DATA);
  },
  getRevenue: (days) => {
    return baseRequest.get(`${UrlApi.URL_GET_REVENUE_SEVEN_DAYS_AGO}/${days}`);
  },
};
