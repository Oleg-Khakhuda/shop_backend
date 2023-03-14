import { Router } from "express";
import { addToCart } from "../../../controllers/cart";

const router = new Router();

router.post("/", addToCart);

export default router;
