import axios from "axios";

export const api = axios.create({
  baseURL: "https://user-management-system-ctnf.onrender.com",
});