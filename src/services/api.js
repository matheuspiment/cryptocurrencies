import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-cryptocurrencies.herokuapp.com/url/?url=https://pro-api.coinmarketcap.com/v1/',
});

export default api;
