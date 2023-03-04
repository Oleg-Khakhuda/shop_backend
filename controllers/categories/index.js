import repositoryCategories from "../../repository/category";
import { HttpCode } from "../../lib/constants";

const getCategories = async (req, res, next) => {
  try {
    const categories = await repositoryCategories.getCategories(req.query);
    if (categories) {
      return res.status(HttpCode.OK).json(categories);
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
    });
  }
};

const addCategory = async (req, res) => {
  try {
    const newCategory = await repositoryCategories.addCategory(req.body);
    // console.log(newCategory);
    if (newCategory) {
      return res.status(HttpCode.CREATED).json(newCategory);
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
    });
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const category = await repositoryCategories.getCategoryById(id);
    if (category) {
      return res.status(HttpCode.OK).json(category);
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
    });
  }
};

const removeCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await repositoryCategories.removeCategory(id);
    if (category) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, category });
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await repositoryCategories.updateCategory(id, req.body);
    if (category) {
      return res.status(HttpCode.OK).json(category);
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
    });
  }
};

export {
  getCategories,
  addCategory,
  getCategoryById,
  removeCategory,
  updateCategory,
};
