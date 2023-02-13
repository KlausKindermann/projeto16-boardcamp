import joi from "joi";

export const categorieSchemma = joi.object({
  name: joi.string().min(2).required(),
});