import axios from 'axios';

export const URL = axios.create({
  baseURL: 'https://todos-restful-api.herokuapp.com/api/',
});
