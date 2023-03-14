import { Router } from "express";
import { checkout } from "../../../controllers/order";

const router = new Router();

router.post("/checkout", checkout);

export default router;
