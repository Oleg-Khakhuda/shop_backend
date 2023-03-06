import { HttpCode } from "../lib/constants";

const guard = (role) => async (req, res, next) => {
  const roleCurrentUser = req.user.role;
  if (roleCurrentUser !== role) {
    return res.status(HttpCode.FORBIDDEN).json({
      status: "error",
      code: HttpCode.FORBIDDEN,
      message: "Access is denied",
    });
  }
  next();
};

export default guard;
