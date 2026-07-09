import { asyncHandler } from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import { addItemToCart, clearCart, getCart, updateCartItem } from "../services/cart.service.js";
import { fetchUserCart } from "../services/dummyjson.service.js";

export const getUserCart = asyncHandler(async (req, res) => {
  const { userId } = req.validated.params;
  const upstreamCart = await fetchUserCart(userId).catch(() => null);
  const cart = upstreamCart?.products?.length ? upstreamCart : getCart(userId);
  return success(res, cart);
});

export const createCartItem = asyncHandler(async (req, res) => {
  const item = req.validated.body;
  const cart = addItemToCart(item.userId, item);
  return success(res, cart, 201);
});

export const patchCartItem = asyncHandler(async (req, res) => {
  const { userId, itemId, quantity } = req.validated.body;
  const cart = updateCartItem(userId, itemId, quantity);
  return success(res, cart);
});

export const deleteCart = asyncHandler(async (req, res) => {
  const { userId } = req.validated.params;
  const cart = clearCart(userId);
  return success(res, cart);
});
