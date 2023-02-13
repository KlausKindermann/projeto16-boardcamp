import { Router } from "express";
import {
  create,
  findAll,
  returnGame,
  remove,
} from "../controllers/rentals.controllers.js";
import {
  validSchemaRentals,
  gamesAvailableInStock,
} from "../middlewares/rentals.middlewares.js";

const router = Router();

router.post("/rentals", validSchemaRentals, gamesAvailableInStock, create);
router.get("/rentals", findAll);
router.post("/rentals/:id/return", returnGame);
router.delete("/rentals/:id", remove);

export default router;