import repositoryProducts from "../../repository/products";
import repositoryMainCategories from "../../repository/mainCategory";
import repositoryCategories from "../../repository/category";
import { HttpCode } from "../../lib/constants";
import fs from "fs";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminMozjpeg from "imagemin-mozjpeg";
import Products from "../../model/products";
import { log } from "console";

const getAllProducts = async (req, res, next) => {
  try {
    const products = await repositoryProducts.getAllProducts();
    if (products) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, products });
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
    });
  }
};

const getProducts = async (req, res, next) => {
  try {
    const { id: categoryId } = req.category;

    const products = await repositoryProducts.listProducts(
      categoryId,
      req.query
    );

    if (products) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, products });
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
    });
  }
};

const getProductsByMainCategory = async (req, res) => {
  // console.log(req.query);
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("mainCategoryId parameter is missing");
  }
  try {
    const mainCategory = await repositoryMainCategories.getMainCategoryById(id);

    if (!mainCategory) {
      return res.status(404).send("Main category not found");
    }
    const categories = await repositoryCategories.getCategories(id);
    const products = await repositoryProducts.getProductsByMainCategory(
      categories.items
    );
    if (products) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, products });
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    // console.log(req.category);
    const { id } = req.params;
    const files = req.files;

    await imagemin(
      files.map((file) => file.path),
      {
        destination: "upload/",
        plugins: [
          imageminMozjpeg({ quality: 50 }),
          imageminJpegtran(),
          imageminPngquant({ quality: [0.6, 0.8] }),
        ],
      }
    );

    const newProduct = await repositoryProducts.addProduct(id, {
      ...req.body,
      productImage: files.map((file) => `http://localhost:7000/` + file.path),
    });
    if (newProduct) {
      return res.status(HttpCode.CREATED).json(newProduct);
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
    });
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await repositoryProducts.getProductById(id);
    // console.log(product);
    if (product) {
      return res.status(HttpCode.OK).json(product);
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так 2",
    });
  }
};

const removeProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productImg = await repositoryProducts.getProductById(id);
    productImg.productImage.forEach((imagePath) => {
      fs.unlinkSync(imagePath);
    });
    const product = await repositoryProducts.removeProduct(id);
    if (product) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, product });
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const files = req.files;

    if (files.length >= 1) {
      const productImg = await repositoryProducts.getProductById(id);
      productImg.productImage.forEach((imagePath) => {
        fs.unlinkSync(imagePath);
      });

      await imagemin(
        files.map((file) => file.path),
        {
          destination: "upload/",
          plugins: [
            imageminMozjpeg({ quality: 50 }),
            imageminJpegtran(),
            imageminPngquant({ quality: [0.6, 0.8] }),
          ],
        }
      );

      const product = await repositoryProducts.updateProduct(id, {
        ...req.body,
        productImage: files.map((file) => `http://localhost:7000/` + file.path),
      });
      if (product) {
        return res.status(HttpCode.OK).json(product);
      }
    }
    const product = await repositoryProducts.updateProduct(id, req.body);
    if (product) {
      return res.status(HttpCode.OK).json(product);
    }
  } catch (error) {
    productImg.productImage.forEach((imagePath) => {
      fs.unlinkSync(imagePath);
    });
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
    });
  }
};

export {
  getAllProducts,
  getProducts,
  getProductsByMainCategory,
  addProduct,
  getProductById,
  removeProduct,
  updateProduct,
};
