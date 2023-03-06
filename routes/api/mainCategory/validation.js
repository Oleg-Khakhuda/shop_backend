import Joi from "joi";
import { HttpCode } from "../../../lib/constants";

const createSchema = Joi.object({
  title: Joi.string().min(2).max(15).required(),
});

const updateSchema = Joi.object({
  title: Joi.string().required(),
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
