import repositoryMainCategories from "../../repository/mainCategory";
import { HttpCode } from "../../lib/constants";

const getMainCategories = async (req, res, next) => {
  try {
    const categories = await repositoryMainCategories.getMainCategories();
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

const addMainCategory = async (req, res) => {
  try {
    const newCategory = await repositoryMainCategories.addMainCategory(
      req.body
    );
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

const getMainCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const category = await repositoryMainCategories.getMainCategoryById(id);
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

const removeMainCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await repositoryMainCategories.removeMainCategory(id);
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

const updateMainCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await repositoryMainCategories.updateMainCategory(
      id,
      req.body
    );
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
  getMainCategories,
  addMainCategory,
  getMainCategoryById,
  removeMainCategory,
  updateMainCategory,
};
