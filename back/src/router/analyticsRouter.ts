import { Router } from "express";
import { getAnalytics } from "../controllers/analyticsControllers";

const router = Router();

router.get("/github/:username", getAnalytics);

export default router;