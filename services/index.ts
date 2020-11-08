import axios from "axios";

// Axios setup
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://reqres.in/api/",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
});

export default api;


// SWR fetcher setup
export const swrFetcher = (url: string) => {
  return api.get(url).then(res => res.data)
}
