import axios from "axios";

export const API_BASE_URL =
  process.env.REACT_APP_BASE_URL ||
  "https://backend-my-protfolio.onrender.com/api/v1";

const authClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default authClient;
