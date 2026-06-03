import axios from "axios";

const API = axios.create({
  baseURL: "https://inventory-management-system-j92r.onrender.com",
});

export default API;