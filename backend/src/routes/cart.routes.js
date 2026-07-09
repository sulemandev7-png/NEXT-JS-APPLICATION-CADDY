import { Router } from "express";
import {
  createCartItem,
  deleteCart,
  getUserCart,
  patchCartItem,
} from "../controllers/cart.controller.js";
import { validate } from "../middleware/validate.js";
import {
  addCartItemSchema,
  cartUserSchema,
  updateCartItemSchema,
} from "../validators/cart.validator.js";

const router = Router();

router.get("/:userId", validate(cartUserSchema), getUserCart);
router.post("/", validate(addCartItemSchema), createCartItem);
router.patch("/", validate(updateCartItemSchema), patchCartItem);
router.delete("/:userId", validate(cartUserSchema), deleteCart);

export default router;
