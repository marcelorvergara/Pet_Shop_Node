import express from "express";
import PetBlogController from "../controllers/petBlog.controller";

const router = express.Router();

router.post("/", PetBlogController.createBlogPost);
router.get("/", PetBlogController.getBlogPosts);
router.post("/comentario", PetBlogController.createComentario);

export default router;
