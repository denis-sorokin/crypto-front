import axios from 'axios'
import store from "./store";

const cryptoApi = axios.create({
  baseURL: 'https://min-api.cryptocompare.com/'
});

cryptoApi.interceptors.request.use(config => {
  store.dispatch('loader/START_LOADER');
  return config
});

cryptoApi.interceptors.response.use(response => {
  store.dispatch('loader/STOP_LOADER');
  return response
});

export default cryptoApi
