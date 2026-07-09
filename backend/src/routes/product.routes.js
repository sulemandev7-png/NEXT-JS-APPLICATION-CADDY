import { Router } from "express";
import { getProduct, listCategories, listProducts } from "../controllers/product.controller.js";
import { validate } from "../middleware/validate.js";
import { productIdSchema, productsQuerySchema } from "../validators/product.validator.js";

const router = Router();

router.get("/", validate(productsQuerySchema), listProducts);
router.get("/categories/list", listCategories);
router.get("/categories", listCategories);
router.get("/:id", validate(productIdSchema), getProduct);

export default router;
