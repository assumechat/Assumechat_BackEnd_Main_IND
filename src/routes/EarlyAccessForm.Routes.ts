import { Router } from "express";
import {
  accessClaimed,
  GetAllForms,
  getNumForms,
  getUserByEmail,
  PostForm,
} from "../controllers/EarlyAccess.Controller";

const router = Router();

router.post("/", PostForm);
router.get("/", GetAllForms);
router.get("/number", getNumForms);
router.post("/getUserByEmail", getUserByEmail);
router.put("/claimed", accessClaimed);
export default router;
