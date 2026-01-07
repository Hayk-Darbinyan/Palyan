import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const api = axios.create({
  baseURL: apiUrl,
});