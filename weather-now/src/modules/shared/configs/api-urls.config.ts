import { JSON_SERVER_API_KEY, WEATHER_API_KEY } from './api-keys.config';

export const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/';
export const JSON_SERVER_BASE_URL = 'https://getpantry.cloud/apiv1/pantry/';

export const URL_LIST = {
  GET_WEATHER_BASED_ON_CITY: `${WEATHER_API_BASE_URL}weather?appid=${WEATHER_API_KEY}`,
  JSON_SERVER_URL_FOR_SEARCH_HISTORY: `${JSON_SERVER_BASE_URL}${JSON_SERVER_API_KEY}/basket/search-history`,
  JSON_SERVER_URL_FOR_SIGN_UP: `${JSON_SERVER_BASE_URL}${JSON_SERVER_API_KEY}/basket/signUp`,
};
