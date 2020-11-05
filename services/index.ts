import axios from "axios";

const urls = {
  test: "https://api.punkapi.com/v2",
  development: "https://api.punkapi.com/v2",
  production: "https://api.punkapi.com/v2"
}

const api = axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
});

export const swrFetcher = (url: string) => api.get(url).then(res => res.data)

export default api;
