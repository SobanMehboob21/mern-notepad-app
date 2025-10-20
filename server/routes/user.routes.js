import express from "express";
import { CreateTheUser, LoginTheUser } from "../controllers/user.controllers.js";

const router = express.Router();


router.post("/api/signup", CreateTheUser);
router.post("/api/login", LoginTheUser);

export default router;
