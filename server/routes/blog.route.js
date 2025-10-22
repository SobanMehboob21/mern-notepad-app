import express from "express";
import {CreateBlog, GetAllBlogs} from '../controllers/blog.controllers.js'

const router = express.Router();


router.post("/api/myblog", CreateBlog);
router.get("/api/allBlogs", GetAllBlogs)

export default router;

