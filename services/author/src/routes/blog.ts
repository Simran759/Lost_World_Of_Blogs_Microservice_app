import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import upload from '../middleware/multer.js';
import { aiBlogResponse, aiDescriptionResponse, aiTitleResponse, createBlog, deleteBlog, updateBlog } from '../controller/blog.js';

const router =express.Router();
router.post("/blog/new",isAuth,upload,createBlog);
router.post("/blog/:id",isAuth,upload,updateBlog);
router.delete("/blog/:id",isAuth,deleteBlog);
router.post("/ai/title",aiTitleResponse);
router.post("/ai/description",aiDescriptionResponse);
router.post("/ai/blog",aiBlogResponse);

export default router;