import { Router } from "express";
import {
  getProducts,
  addProduct,
  getProductById,
  removeProduct,
  updateProduct,
} from "../../../controllers/products";
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

router.get("/", getProducts);

router.get("/product/:id", getProductById);

// router.post("/", upload.array("plateImage", 10), addPlate);
router.post("/", addProduct);

router.delete("/:id", removeProduct);

router.put("/:id", updateProduct);

// router.patch('/:id/favorite', validateUpdateFavorite, validateId, updatePlate)

export default router;
