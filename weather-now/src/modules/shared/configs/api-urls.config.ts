import { API_KEY } from "./api-keys.config";

export const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const URL_LIST = {
  GET_WEATHER_BASED_ON_CITY: `${API_BASE_URL}weather?appid=${API_KEY}`,
};
