import { Router } from "express";
import { create, findAll } from "../controllers/categories.controllers.js";
import { validSchemaCategories } from "../middlewares/categories.middlewares.js";

const router = Router();

router.post("/categories", validSchemaCategories, create);
router.get("/categories", findAll);

export default router;
