import { connectionDB } from "../database/db.js";
import { categorieSchemma } from "../models/categories.js";

export async function validSchemaCategories(req, res, next) {
  const categorie = req.body;

  const emUso = await connectionDB.query(
    "SELECT * FROM categories WHERE name=$1",
    [categorie.name]
  );

  if (emUso.rowCount !== 0) {
    return res.sendStatus(409);
  }

  const { error } = categorieSchemma.validate(categorie, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send({ errors });
  }


  res.locals.categorie = categorie;

  next();
}