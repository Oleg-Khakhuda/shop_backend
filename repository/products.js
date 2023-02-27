import Products from "../model/products";

const getProducts = async () => {
  const result = await Products.find();
  return result;
};

const addProduct = async (body) => {
  const product = await Products.create({ ...body });
  return product;
};

export default {
  getProducts,
  addProduct,
};
