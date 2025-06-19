import { Router } from "express";
import {
  GetAllForms,
  getNumForms,
  PostForm,
} from "../controllers/EarlyAccess.Controller";

const router = Router();

router.post("/", PostForm);
router.get("/", GetAllForms);
router.get("/number", getNumForms);

export default router;
