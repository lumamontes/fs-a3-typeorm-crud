import * as express from "express";
import { Router } from "express";
import { deletePost, findAll, findById, store, update } from "../controllers/postController";

const router: Router = express.Router();

router.get("/posts", findAll);
router.get("/posts/:id", findById);
router.post("/posts", store);
router.put("/posts/:id", update);
router.delete("/posts/:id", deletePost);

export default router;
