import Joi from "joi";
import { HttpCode } from "../../../lib/constants.js";

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  name: Joi.string().min(2).max(20),
  token: Joi.string().allow(null),
});

export const validateAuth = async (req, res, next) => {
  try {
    await authSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: err.message.replace(/"/g, "") });
  }
  next();
};
