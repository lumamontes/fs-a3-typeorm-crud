import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Comment } from "../entity/Comment";

const CommentRepository = AppDataSource.getRepository(Comment);

const findAll = async (req: Request, res: Response) => {
    try {
      const comments = await CommentRepository.find({ relations: ["user","post"] });
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const findById = async (req: Request, res: Response) => {
    try {
      const comment = await CommentRepository.findOne({
        where: { id: parseInt(req.params.id) },
        relations: ["user","post"]
      });
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const store = async (req: Request, res: Response) => {
    try {
      const { text, user , post } = req.body;
  
      const comment = new Comment();
      comment.text = text;
      comment.user = user;
      comment.post = post;

      await CommentRepository.save(comment);
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const update = async (req: Request, res: Response) => {
    try {
      const comment = await CommentRepository.findOneBy({ id: parseInt(req.params.id) });
  
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      const { text, post, user } = req.body;
      comment.text = text ?? comment.text;
      comment.post = post ?? comment.post;
      comment.user = user ?? comment.user;
  
      await CommentRepository.save(comment);
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const deleteComment = async (req: Request, res: Response) => {
    try {
      const comment = await CommentRepository.findOneBy({ id: parseInt(req.params.id) });
  
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      await CommentRepository.remove(comment);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  export {
    findAll,
    findById,
    store,
    update,
    deleteComment,
  };