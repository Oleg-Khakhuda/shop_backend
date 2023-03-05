import { Router } from "express";
import {
  getMainCategories,
  addMainCategory,
  getMainCategoryById,
  removeMainCategory,
  updateMainCategory,
} from "../../../controllers/mainCategories";

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

router.get("/", getMainCategories);

router.get("/maincategory/:id", getMainCategoryById);

// router.post("/", upload.array("plateImage", 10), addPlate);
router.post("/", addMainCategory);

router.delete("/:id", removeMainCategory);

router.put("/:id", updateMainCategory);

// router.patch('/:id/favorite', validateUpdateFavorite, validateId, updatePlate)

export default router;
