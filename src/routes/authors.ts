import * as express from 'express';
import { Router } from 'express';
import { findAll, findById, store, update, deleteAuthor } from "../controllers/authorController";

const router: Router = express.Router();

router.get("/authors", findAll);
router.get("/authors/:id", findById);
router.post("/authors", store);
router.put("/authors/:id", update);
router.delete("/authors/:id", deleteAuthor);

export default router;