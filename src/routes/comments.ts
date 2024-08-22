import * as express from "express";
import { Router } from "express";
import {
  findAll,
  findById,
  store,
  update,
  deleteComment,
} from "../controllers/commentController";

const router: Router = express.Router();

router.get("/comments", findAll);
router.get("/comments/:id", findById);
router.post("/comments", store);
router.put("/comments/:id", update);
router.delete("/comments/:id", deleteComment);

export default router;
