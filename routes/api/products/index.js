import { Router } from "express";
import { getProducts, addProduct } from "../../../controllers/products";
// import {
//   validateQuery,
//   validateCreate,
//   validateUpdate,
//   validateUpdateFavorite,
//   validateId,
// } from "./validation";
// import { upload } from "../../../middlewares/upload";

const router = new Router();

router.get("/", getProducts);

// router.get("/plate/:id", validateId, getPlateById);

// router.post("/", upload.array("plateImage", 10), addPlate);
router.post("/", addProduct);

// router.delete("/:id", removePlate);

// router.put("/:id", updatePlate);

// router.patch('/:id/favorite', validateUpdateFavorite, validateId, updatePlate)

export default router;
