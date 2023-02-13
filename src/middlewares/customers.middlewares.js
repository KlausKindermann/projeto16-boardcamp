import { connectionDB } from "../database/db.js";
import { customerSchemma } from "../models/customers.js";

export async function validSchemaCustomer(req, res, next) {
  const customer = req.body;

  const { error } = customerSchemma.validate(customer, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send({ errors });
  }

  const cpfJaUsado = await connectionDB.query(
    "SELECT * FROM customers WHERE cpf=$1",
    [customer.cpf]
  );

  if (
    cpfJaUsado.rowCount !== 0 &&
    cpfJaUsado.rows[0].id !== Number(req.params.id)
  ) {
    return res.sendStatus(409);
  }

  res.locals.customer = customer;

  next();
}