import { asyncHandler } from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import {
  fetchCategories,
  fetchProductById,
  fetchProducts,
} from "../services/dummyjson.service.js";

export const listProducts = asyncHandler(async (req, res) => {
  const { search, category, limit, skip } = req.validated.query;
  const data = await fetchProducts({ search, category, limit, skip });
  return success(res, data);
});

export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.validated.params;
  const product = await fetchProductById(id);
  return success(res, product);
});

export const listCategories = asyncHandler(async (req, res) => {
  const categories = await fetchCategories();
  return success(res, categories);
});
