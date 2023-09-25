import repositoryMainCategories from "../../repository/mainCategory";
import { HttpCode } from "../../lib/constants";
import fs from "fs";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminMozjpeg from "imagemin-mozjpeg";

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
    const file = req.file;

    await imagemin([req.file.path], {
      destination: "upload/",
      plugins: [
        imageminMozjpeg({ quality: 50 }),
        imageminJpegtran(),
        imageminPngquant({ quality: [0.6, 0.8] }),
      ],
    });

    const newCategory = await repositoryMainCategories.addMainCategory({
      ...req.body,
      image: `http://localhost:7000/` + file.path,
    });
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
    const mainCatImg = await repositoryMainCategories.getMainCategoryById(id);
    const imgUrl = mainCatImg.image.replace("http://localhost:7000/", "");

    const category = await repositoryMainCategories.removeMainCategory(id);
    if (category) {
      fs.unlinkSync(imgUrl);
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

const updateMainCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (file) {
      const mainCatImg = await repositoryMainCategories.getMainCategoryById(id);
      const imgUrl = mainCatImg.image.replace("http://localhost:7000/", "");
      if (mainCatImg) {
        fs.unlinkSync(imgUrl);
      }

      await imagemin([req.file.path], {
        destination: "upload/",
        plugins: [
          imageminMozjpeg({ quality: 50 }),
          imageminJpegtran(),
          imageminPngquant({ quality: [0.6, 0.8] }),
        ],
      });

      const category = await repositoryMainCategories.updateMainCategory(id, {
        ...req.body,
        image: `http://localhost:7000/` + file.path,
      });

      if (category) {
        return res.status(HttpCode.OK).json(category);
      }
    }
    const category = await repositoryMainCategories.updateMainCategory(
      id,
      req.body
    );
    if (category) {
      return res.status(HttpCode.OK).json(category);
    }
  } catch (error) {
    fs.unlinkSync(file.path);
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
