import { IBlogPost, IComentario } from "../interfaces/IBlogPost";
import PetBlogRepository from "../repository/petBlog.repo";

async function createBlogPost(post: IBlogPost) {
  return await PetBlogRepository.createBlogPost(post);
}

async function getBlogPosts() {
  return await PetBlogRepository.getBlogPosts();
}

async function createComentario(comentario: IComentario) {
  return await PetBlogRepository.createComentario(comentario);
}

export default {
  createBlogPost,
  getBlogPosts,
  createComentario,
};
