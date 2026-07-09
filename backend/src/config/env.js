import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  dummyjsonBaseUrl: process.env.DUMMYJSON_BASE_URL || "https://dummyjson.com",
};
