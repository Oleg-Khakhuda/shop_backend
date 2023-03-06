import Joi from "joi";
import mongoose from "mongoose";
import { HttpCode } from "../../../lib/constants";

const { Types } = mongoose;

const createSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  quantity: Joi.number().min(0).max(300).allow(null),
  price: Joi.number().min(2).max(10000).required(),
  description: Joi.string().min(2).max(500),
  size: Joi.array().items(Joi.string()),
  productImage: Joi.array().items(Joi.string()).allow(null),
  category: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const updateSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().allow(null),
  price: Joi.number().required(),
  description: Joi.string(),
  size: Joi.array().items(Joi.string()),
  productImage: Joi.array().items(Joi.string()).allow(null),
  category: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
}).or("name", "quantity", "price", "description", "size", "productImage");

const regLimit = /\d+/;

const querySchema = Joi.object({
  limit: Joi.string().pattern(regLimit).optional(),
  skip: Joi.number().min(0).optional(),
  sortBy: Joi.string().valid("name", "price", "size").optional(),
  sortByDesc: Joi.string().valid("name", "price", "size").optional(),
  filter: Joi.string()
    .pattern(new RegExp("(name|price|size)\\|?(name|price|size)+"))
    .optional(),
});

export const validateCreate = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: `Field ${err.message.replace(/"/g, "")}` });
  }
  next();
};

export const validateUpdate = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === "object.missing") {
      return res
        .status(HttpCode.BAD_REQUEST)
        .json({ message: "missing fields" });
    }
    return res.status(HttpCode.BAD_REQUEST).json({ message: err.message });
  }
  next();
};

export const validateId = (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: "Invalided ObjectId" });
  }
  next();
};

export const validateQuery = async (req, res, next) => {
  try {
    await querySchema.validateAsync(req.query);
  } catch (err) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: `Field ${err.message.replace(/"/g, "")}` });
  }
  next();
};
