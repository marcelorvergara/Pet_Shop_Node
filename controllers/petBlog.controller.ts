import { NextFunction, Request, Response } from "express";
import { IBlogPost, IComentario } from "../interfaces/IBlogPost";
import PetBlog from "../services/petBlog.service";

async function createBlogPost(req: Request, res: Response, next: NextFunction) {
  try {
    let post: IBlogPost = req.body;
    if (!post.titulo || !post.conteudo) {
      throw new Error("Título e conteúdo são obrigatórios!");
    }
    const response = await PetBlog.createBlogPost(post);
    res.send(response);
    logger.info(`POST /post - ${JSON.stringify(response)}`);
  } catch (err) {
    next(err);
  }
}

async function getBlogPosts(req: Request, res: Response, next: NextFunction) {
  try {
    res.send(await PetBlog.getBlogPosts());
    logger.info("GET /post");
  } catch (err) {
    next(err);
  }
}

async function createComentario(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let comentario: IComentario = req.body;
    if (!comentario._id || !comentario.nome || !comentario.conteudo) {
      throw new Error("Post Id, nome e conteúdo são obrigatórios!");
    }
    const response = await PetBlog.createComentario(comentario);
    res.send(response);
    logger.info(`POST /post/comentario - ${JSON.stringify(response)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createBlogPost,
  getBlogPosts,
  createComentario,
};
