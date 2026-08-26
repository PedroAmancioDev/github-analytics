import { Router } from "express";
import { getAnalytics, getUserRepos, getUserLanguages } from "../controllers/analyticsControllers";

const router = Router();

router.get("/github/:username", getAnalytics); // profile 
router.get("/github/repos/:username", getUserRepos); // repos
router.get("/github/repos/:username/languages", getUserLanguages); // languages

export default router;