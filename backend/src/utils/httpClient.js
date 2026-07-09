import axios from "axios";
import { env } from "../config/env.js";

export const httpClient = axios.create({
  baseURL: env.dummyjsonBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
