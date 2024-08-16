import * as express from 'express';
import { Router } from 'express';
import { findAll, findById, store, update, deleteUser } from "../controllers/usersController";

const router: Router = express.Router();

router.get("/users", findAll);
router.get("/users/:id", findById);
router.post("/users", store);
router.put("/users/:id", update);
router.delete("/users/:id", deleteUser);

export default router;
