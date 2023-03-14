import { Router } from "express";
import {
  getAllProducts,
  getProducts,
  addProduct,
  getProductById,
  removeProduct,
  updateProduct,
} from "../../../controllers/products";
import guardCategory from "../../../middlewares/guardCategory";
import roleAccess from "../../../middlewares/role-access";
import { Role } from "../../../lib/constants";
import {
  validateQuery,
  validateCreate,
  validateUpdate,
  validateId,
} from "./validation";
import { upload } from "../../../middlewares/upload";
import guard from "../../../middlewares/guard";

const router = new Router();

router.get("/", validateQuery, getAllProducts);

router.get("/:id", guardCategory, validateQuery, getProducts);

router.get("/product/:id", validateId, getProductById);

// router.post("/", upload.array("plateImage", 10), addPlate);

router.post(
  "/:id",
  [guard, roleAccess(Role.ADMIN), guardCategory],
  upload.array("productImage", 10),
  addProduct
);

router.delete("/:id", [guard, roleAccess(Role.ADMIN)], removeProduct);

router.put(
  "/:id",
  [guard, roleAccess(Role.ADMIN)],
  upload.array("productImage", 10),
  updateProduct
);

export default router;
