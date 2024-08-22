import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Author } from "../entity/Author";

const AuthorRepository = AppDataSource.getRepository(Author);

const findAll = async (req: Request, res: Response) => {
  try {
    const authors = await AuthorRepository.find({
      relations: ["posts", "comments"],
    });
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findById = async (req: Request, res: Response) => {
  try {
    const author = await AuthorRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ["posts", "comments"],
    });
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const store = async (req: Request, res: Response) => {
  try {
    const { name, email, tags, surname, completeName } = req.body;

    const author = new Author();
    author.name = name;
    author.email = email;
    author.tags = tags;
    author.surname = surname;
    author.completeName = completeName;

    await AuthorRepository.save(author);
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const author = await AuthorRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    const { name, email, tags, surname, completeName } = req.body;
    author.name = name ?? author.name;
    author.email = email ?? author.email;
    author.tags = tags ?? author.tags;
    author.surname = surname ?? author.surname;
    author.completeName = completeName ?? author.completeName;

    await AuthorRepository.save(author);
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const author = await AuthorRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    await AuthorRepository.remove(author);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { findAll, findById, store, update, deleteAuthor };
