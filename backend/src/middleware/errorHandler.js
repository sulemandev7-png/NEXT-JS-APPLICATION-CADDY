import { failure } from "../utils/apiResponse.js";

export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.response?.status || 500;
  const message =
    err.response?.data?.message || err.message || "Internal server error";
  const details = err.details || err.response?.data || undefined;

  if (res.headersSent) {
    return next(err);
  }

  return failure(res, message, statusCode, details);
}
