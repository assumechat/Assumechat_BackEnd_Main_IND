import { Router } from "express";
import { GetAllForms, PostForm } from "../controllers/EarlyAccess.Controller";

const router = Router();

router.post("/", PostForm);
router.get("/", GetAllForms);

export default router;
