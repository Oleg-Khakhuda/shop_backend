import { HttpCode } from "../../lib/constants";
import AuthService from "../../service/auth";
const authService = new AuthService();

const registration = async (req, res, next) => {
  console.log(req.body);
  const { email } = req.body;
  const isUserExist = await authService.isUserExist(email);
  if (isUserExist) {
    return res.status(HttpCode.CONFLICT).json({
      status: "success",
      code: HttpCode.CONFLICT,
      message: "Email is already exist",
    });
  }
  const user = await authService.create(req.body);
  const token = authService.getToken(user);
  await authService.setToken(user.id, token);

  res.status(HttpCode.OK).json({ status: "success", code: HttpCode.OK, token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.getUser(email, password);
  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Invalided credentials",
    });
  }
  const token = authService.getToken(user);
  await authService.setToken(user.id, token);

  res.status(HttpCode.OK).json({ status: "success", code: HttpCode.OK, token });
};

const logout = async (req, res, next) => {
  await authService.setToken(req.user.id, null);
  res.status(HttpCode.NO_CONTENT).json();
};

const currentUser = async (req, res, next) => {
  const { name, email, role } = req.user;
  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: { name, email, role },
  });
};

export { registration, login, logout, currentUser };
