import { asyncHandler } from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import { loginUser } from "../services/dummyjson.service.js";
import { clearCart } from "../services/cart.service.js";

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.validated.body;
  const user = await loginUser({ username, password });

  clearCart(user.id);

  return success(res, {
    user,
    token: user.token,
    message: "Login successful",
  });
});

export const logout = asyncHandler(async (req, res) => {
  return success(res, {
    message: "Logout successful",
  });
});
