import repositoryProducts from "../../repository/products";
import { HttpCode } from "../../lib/constants";

const getProducts = async (req, res, next) => {
  try {
    const products = await repositoryProducts.getProducts(req.query);
    if (products) {
      return res.status(HttpCode.OK).json(products);
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
    // const reqFiles = [];

    // for (let i = 0; i < req.files.length; i++) {
    //   reqFiles.push(
    //     `http://localhost:${process.env.PORT}/${req.files[i].path}`
    //   );
    // }

    // console.log(req.body);

    const newProduct = await repositoryProducts.addProduct({
      ...req.body,
      // plateImage: reqFiles,
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

export { getProducts, addProduct };
