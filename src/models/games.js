import joi from "joi";

export const gameSchemma = joi.object({
  name: joi.string().min(2).required(),
  image: joi.string().min(2).required(),
  stockTotal: joi.number().positive().required(),
  categoryId: joi.number().required(),
  pricePerDay: joi.number().positive().required(),
});