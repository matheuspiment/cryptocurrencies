import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-cryptocurrencies.herokuapp.com/',
});

export default api;
