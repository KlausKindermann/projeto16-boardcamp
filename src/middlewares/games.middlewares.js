import { connectionDB } from "../database/db.js";
import { gameSchemma } from "../models/games.js";

export async function validSchemaGames(req, res, next) {
    const game = req.body;

    const JogoExiste = await connectionDB.query(
        "SELECT * FROM games WHERE name=$1",
        [game.name]
    );

    if (JogoExiste.rowCount !== 0) {
        return res.sendStatus(409);
    }

    const { error } = gameSchemma.validate(game, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send({ errors });
    }

    const idEmUso = await connectionDB.query(
        "SELECT * FROM categories WHERE id=$1",
        [game.categoryId]
    );

    if (idEmUso.rowCount === 0) {
        return res.sendStatus(400);
    }

    res.locals.game = game;

    next();
}
