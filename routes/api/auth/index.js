import { Router } from "express";
import {
  registration,
  login,
  logout,
  currentUser,
} from "../../../controllers/auth";
import guard from "../../../middlewares/guard";
// import { validateAuth, validateUpdateSubscription } from "./validate";
// import limiter from "../../../middlewares/rate-limit";

const router = new Router();

router.post("/signup", registration);
router.post("/login", login);
router.post("/logout", guard, logout);
router.get("/current", currentUser);

export default router;
