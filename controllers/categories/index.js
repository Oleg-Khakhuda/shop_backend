import repositoryCategories from "../../repository/category";
import { HttpCode } from "../../lib/constants";
import fs from "fs";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminMozjpeg from "imagemin-mozjpeg";

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await repositoryCategories.getAllCategories();
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

const getCategories = async (req, res, next) => {
  try {
    const { id: categoryId } = req.mainCategory;
    const result = await repositoryCategories.getCategories(categoryId);
    if (result) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, result });
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
    const { id: categoryId } = req.mainCategory;
    const file = req.file;
    await imagemin([req.file.path], {
      destination: "upload/",
      plugins: [
        imageminMozjpeg({ quality: 50 }),
        imageminJpegtran(),
        imageminPngquant({ quality: [0.6, 0.8] }),
      ],
    });
    const newCategory = await repositoryCategories.addCategory(categoryId, {
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

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

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

    const catImg = await repositoryCategories.getCategoryById(id);
    const imgUrl = catImg.image.replace("http://localhost:7000/", "");

    const category = await repositoryCategories.removeCategory(id);
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

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;
    console.log(req.body);

    if (file) {
      const catImg = await repositoryCategories.getCategoryById(id);
      const imgUrl = catImg.image.replace("http://localhost:7000/", "");
      if (catImg) {
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

      const category = await repositoryCategories.updateCategory(id, {
        ...req.body,
        image: `http://localhost:7000/` + file.path,
      });
      if (category) {
        return res.status(HttpCode.OK).json(category);
      }
    }

    const category = await repositoryCategories.updateCategory(id, req.body);
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
  getAllCategories,
  getCategories,
  addCategory,
  getCategoryById,
  removeCategory,
  updateCategory,
};
