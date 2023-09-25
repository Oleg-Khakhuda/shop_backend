import { Router } from "express";
import { getProductsByMainCategory } from "../../../controllers/products";
import {
  getMainCategories,
  addMainCategory,
  getMainCategoryById,
  removeMainCategory,
  updateMainCategory,
} from "../../../controllers/mainCategories";
import guard from "../../../middlewares/guard";
import roleAccess from "../../../middlewares/role-access";
import { Role } from "../../../lib/constants";
import { validateCreate, validateUpdate, validateId } from "./validation";
import { upload } from "../../../middlewares/upload";
// import guard from "../../../middlewares/guard";

const router = new Router();

router.get("/", getMainCategories);

router.get("/maincategory/:id", getMainCategoryById);
router.get("/maincategory/products/:id", getProductsByMainCategory);
// router.post("/", upload.array("plateImage", 10), addPlate);
router.post(
  "/",
  [guard, roleAccess(Role.ADMIN)],
  upload.single("image"),
  addMainCategory
);

router.delete("/:id", [guard, roleAccess(Role.ADMIN)], removeMainCategory);

router.put(
  "/:id",
  [guard, roleAccess(Role.ADMIN)],
  upload.single("image"),
  updateMainCategory
);

// router.patch('/:id/favorite', validateUpdateFavorite, validateId, updatePlate)

export default router;
