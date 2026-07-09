import { failure } from "../utils/apiResponse.js";

export function notFound(req, res) {
  return failure(res, `Route not found: ${req.originalUrl}`, 404);
}
