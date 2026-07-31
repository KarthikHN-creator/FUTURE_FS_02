import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://YOUR-RENDER-BACKEND.onrender.com/api",

  headers: {
    "Content-Type": "application/json",
  },
});

export default API;