import repositoryProducts from "../../repository/products";
import { HttpCode } from "../../lib/constants";
import fs from "fs";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";

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

const addProduct = async (req, res) => {
  try {
    const { id: categoryId } = req.category;
    const files = req.files;

    await imagemin(
      files.map((file) => file.path),
      {
        destination: "upload/",
        plugins: [
          imageminJpegtran(),
          imageminPngquant({ quality: [0.6, 0.8] }),
        ],
      }
    );

    const newProduct = await repositoryProducts.addProduct(categoryId, {
      ...req.body,
      productImage: files.map((file) => file.path),
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
    if (product) {
      return res.status(HttpCode.OK).json(product);
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
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

    if (files) {
      const productImg = await repositoryProducts.getProductById(id);
      console.log(productImg.productImage);
      productImg.productImage.forEach((imagePath) => {
        fs.unlinkSync(imagePath);
      });

      await imagemin(
        files.map((file) => file.path),
        {
          destination: "upload/",
          plugins: [
            imageminJpegtran(),
            imageminPngquant({ quality: [0.6, 0.8] }),
          ],
        }
      );
    }

    const product = await repositoryProducts.updateProduct(id, {
      ...req.body,
      productImage: files.map((file) => file.path),
    });
    if (product) {
      return res.status(HttpCode.OK).json(product);
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
  getAllProducts,
  getProducts,
  addProduct,
  getProductById,
  removeProduct,
  updateProduct,
};
