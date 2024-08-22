import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";
import { Author } from "../entity/Author";
import { Comment } from "../entity/Comment";

const PostRepository = AppDataSource.getRepository(Post);
const AuthorRepository = AppDataSource.getRepository(Author);
const CommentRepository = AppDataSource.getRepository(Comment);

const findAll = async (req: Request, res: Response) => {
  try {
    const posts = await PostRepository.find({
      relations: ["author", "comments", "comments.author"],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: "The post id was not provided" });
    }

    const post = await PostRepository.findOne({
      where: { id },
      relations: ["author", "comments", "comments.author"],
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const store = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { authorId } = body;

    if (!authorId) {
      return res.status(404).json({ message: "The author was not provided" });
    }

    const AuthorFound = await AuthorRepository.findOne({
      where: {
        id: authorId,
      },
    });

    if (!AuthorFound) {
      return res.status(404).json({ message: "Author not found" });
    }

    const { title, text } = body;
    const post = new Post();
    post.title = title;
    post.text = text;
    post.author = AuthorFound;

    await PostRepository.save(post);

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    try {
      const post = await PostRepository.findOne({
        where: {
          id: parseInt(req.params.id),
        },
        relations: ["author"],
      });

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const { body } = req;
      if (!body) {
        return res.status(404).json({ message: "Body was not provided" });
      }

      const { title, text, authorId } = body;

      if ((post.author || {}).id !== authorId) {
        const AuthorFound = await AuthorRepository.findOne({
          where: {
            id: authorId,
          },
        });

        post.author = AuthorFound ?? post.author;
      }

      post.title = title ?? post.title;
      post.text = text ?? post.text;

      await PostRepository.save(post);
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await PostRepository.findOne({
      where: {
        id: parseInt(req.params.id),
      },
      relations: ["comments"],
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await PostRepository.remove(post);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { findAll, store, findById, update, deletePost };
