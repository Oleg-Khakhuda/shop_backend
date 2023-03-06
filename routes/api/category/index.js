import { Router } from "express";
import {
  getAllCategories,
  getCategories,
  addCategory,
  getCategoryById,
  removeCategory,
  updateCategory,
} from "../../../controllers/categories";
import guardMainCategory from "../../../middlewares/guardMainCategory";
import roleAccess from "../../../middlewares/role-access";
import { Role } from "../../../lib/constants";
import guard from "../../../middlewares/guard";
import { validateCreate, validateUpdate, validateId } from "./validation";
// import { upload } from "../../../middlewares/upload";
// import guard from "../../../middlewares/guard";

const router = new Router();

router.get("/", getAllCategories);

router.get("/:id", guardMainCategory, getCategories);

router.get("/category/:id", validateId, getCategoryById);

// router.post("/", upload.array("plateImage", 10), addPlate);
router.post(
  "/:id",
  [guard, roleAccess(Role.ADMIN), guardMainCategory, validateCreate],
  addCategory
);

router.delete("/:id", [guard, roleAccess(Role.ADMIN)], removeCategory);

router.put(
  "/:id",
  [guard, roleAccess(Role.ADMIN), validateUpdate],
  updateCategory
);

// router.patch('/:id/favorite', validateUpdateFavorite, validateId, updatePlate)

export default router;
