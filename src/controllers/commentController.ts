import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Author } from "../entity/Author";
import { Comment } from "../entity/Comment";
import { Post } from "../entity/Post";

const CommentRepository = AppDataSource.getRepository(Comment);
const AuthorRepository = AppDataSource.getRepository(Author);
const PostRepository = AppDataSource.getRepository(Post);

const findAll = async (req: Request, res: Response) => {
  try {
    const comments = await CommentRepository.find({
      relations: ["author", "post"],
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(404)
        .json({ message: "The comment id was not provided" });
    }

    const post = await CommentRepository.findOne({
      where: { id },
      relations: ["author", "post"],
    });

    if (!post) {
      return res.status(404).json({ message: "Comment not found" });
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

    const { postId } = body;

    const PostFound = await PostRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!PostFound) {
      return res.status(404).json({ message: "Post not found" });
    }

    const { text } = body;
    const comment = new Comment();

    comment.text = text;
    comment.author = AuthorFound;
    comment.post = PostFound;

    await CommentRepository.save(comment);

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    try {
      const comment = await CommentRepository.findOne({
        where: {
          id: parseInt(req.params.id),
        },
        relations: ["author"],
      });

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      const { body } = req;
      if (!body) {
        return res.status(404).json({ message: "Body was not provided" });
      }

      const { text, authorId, postId } = body;

      if ((comment.author || {}).id !== authorId) {
        const AuthorFound = await AuthorRepository.findOne({
          where: {
            id: authorId,
          },
        });

        comment.author = AuthorFound ?? comment.author;
      }

      if ((comment.post || {}).id !== postId) {
        const PostFound = await PostRepository.findOne({
          where: {
            id: postId,
          },
        });

        comment.post = PostFound ?? comment.post;
      }

      comment.text = text ?? comment.text;

      await CommentRepository.save(comment);
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await CommentRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await CommentRepository.remove(comment);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { findAll, store, findById, update, deleteComment };
