import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const UserRepository = AppDataSource.getRepository(User);

const findAll = async (req: Request, res: Response) => {
  try {
    const users = await UserRepository.find({ relations: ["posts"] });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findById = async (req: Request, res: Response) => {
  try {
    const user = await UserRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ["posts"]
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const store = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const user = new User();
    user.name = name;
    user.email = email;

    await UserRepository.save(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const user = await UserRepository.findOneBy({ id: parseInt(req.params.id) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email } = req.body;
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    await UserRepository.save(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await UserRepository.findOneBy({ id: parseInt(req.params.id) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await UserRepository.remove(user);
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
  deleteUser,
};
