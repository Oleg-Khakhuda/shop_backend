import Products from "../model/products";

const getProducts = async () => {
  const result = await Products.find();
  return result;
};

const addProduct = async (body) => {
  const product = await Products.create({ ...body });
  return product;
};

const getProductById = async (productId) => {
  const result = await Products.findOne({ _id: productId });
  return result;
};

const removeProduct = async (productId) => {
  const result = await Products.findOneAndRemove({ _id: productId });
  return result;
};

const updateProduct = async (productId, body) => {
  const result = await Products.findByIdAndUpdate(
    productId,
    { ...body },
    { new: true }
  );
  return result;
};

export default {
  getProducts,
  addProduct,
  getProductById,
  removeProduct,
  updateProduct,
};
