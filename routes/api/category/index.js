import { Router } from "express";
import {
  getAllCategories,
  getCategories,
  addCategory,
  getCategoryById,
  removeCategory,
  updateCategory,
} from "../../../controllers/categories";
import guardCategory from "../../../middlewares/guardCategory";
import guardMainCategory from "../../../middlewares/guardMainCategory";
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

router.get("/", getAllCategories);

router.get("/:id", guardMainCategory, getCategories);

router.get("/category/:id", getCategoryById);

// router.post("/", upload.array("plateImage", 10), addPlate);
router.post("/:id", guardMainCategory, addCategory);

router.delete("/:id", removeCategory);

router.put("/:id", updateCategory);

// router.patch('/:id/favorite', validateUpdateFavorite, validateId, updatePlate)

export default router;
