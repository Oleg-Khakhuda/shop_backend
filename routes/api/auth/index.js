import { Router } from "express";
import {
  registration,
  login,
  logout,
  currentUser,
} from "../../../controllers/auth";
import guard from "../../../middlewares/guard";
import { validateAuth } from "./validation";
// import limiter from "../../../middlewares/rate-limit";

const router = new Router();

router.post("/signup", validateAuth, registration);
router.post("/login", validateAuth, login);
router.post("/logout", guard, logout);
router.get("/current", guard, currentUser);

export default router;
