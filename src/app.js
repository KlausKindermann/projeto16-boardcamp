import express, { application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoriesRoutes from "./routes/categories.routes.js";
import gamesRoutes from "./routes/games.routes.js";
import customersRoutes from "./routes/customers.routes.js";
import rentalsRoutes from "./routes/rentals.routes.js";

dotenv.config()

const app = express();

app.use(categoriesRoutes);
app.use(gamesRoutes);
app.use(customersRoutes);
app.use(rentalsRoutes);
app.use(express.json());
app.use(cors());

const port = process.env.PORT;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))