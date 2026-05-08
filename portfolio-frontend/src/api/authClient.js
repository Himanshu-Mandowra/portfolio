import axios from "axios";

const authClient = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

export default authClient;