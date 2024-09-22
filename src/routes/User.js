import { Router } from "express";
import { fetchUserById, updateUser } from "../controller/User.js";
const router = Router();
router.get("/:id", fetchUserById).patch("/:id", updateUser);

export default router;
