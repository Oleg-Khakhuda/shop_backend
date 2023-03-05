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

import category from "../../../repository/category";
// import {
//   validateQuery,
//   validateCreate,
//   validateUpdate,
//   validateUpdateFavorite,
//   validateId,
// } from "./validation";
// import { upload } from "../../../middlewares/upload";
// import guard from "../../../middlewares/guard";

const router = new Router();

router.get("/", getAllProducts);

router.get("/:id", guardCategory, getProducts);

router.get("/product/:id", getProductById);

// router.post("/", upload.array("plateImage", 10), addPlate);
router.post("/:id", guardCategory, addProduct);

router.delete("/:id", removeProduct);

router.put("/:id", updateProduct);

// router.patch('/:id/favorite', validateUpdateFavorite, validateId, updatePlate)

export default router;
