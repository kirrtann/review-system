import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_API_ENDPOINT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export default http;
