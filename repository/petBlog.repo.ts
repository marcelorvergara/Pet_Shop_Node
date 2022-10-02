import { IBlogPost, IComentario } from "../interfaces/IBlogPost";
import { getClient } from "./mongo.db";
import { ObjectId } from "mongodb";

async function createBlogPost(post: IBlogPost) {
  const client = getClient();
  try {
    await client.connect();
    return await client.db("blog").collection("petBlog").insertOne(post);
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

async function getBlogPosts() {
  const client = getClient();
  try {
    await client.connect();
    const res = await client
      .db("blog")
      .collection("petBlog")
      .find({})
      .toArray();
    if (res) {
      return res;
    } else {
      return "Not found";
    }
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

async function getBlogPost(post_id: string) {
  // convertendo para mongodb id
  const o_id = new ObjectId(post_id);
  const client = getClient();
  try {
    await client.connect();
    const res = await client
      .db("blog")
      .collection("petBlog")
      .findOne({ _id: o_id });
    if (res) {
      return res;
    } else {
      return "Not found";
    }
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

async function updateBlogPost(post: IBlogPost, post_id: string) {
  // convertendo para mongodb id
  const o_id = new ObjectId(post_id);
  const client = getClient();
  try {
    await client.connect();
    return await client
      .db("blog")
      .collection("petBlog")
      .updateOne({ _id: o_id }, { $set: { ...post } });
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

async function createComentario(comentario: IComentario) {
  try {
    if (comentario._id) {
      const post: any = await getBlogPost(comentario._id);
      if (post !== "Not found") {
        if (!post.comentarios) {
          post.comentarios = [];
        }
        post.comentarios.push({
          nome: comentario.nome,
          conteudo: comentario.conteudo,
        });
        return await updateBlogPost(post, comentario._id);
      } else {
        return "Post not found";
      }
    }
  } catch (err) {
    throw err;
  }
}

export default {
  createBlogPost,
  getBlogPosts,
  createComentario,
};
