import Products from "../model/products";

const getAllProducts = async () => {
  const total = await Products.countDocuments();
  const product = await Products.find();
  // console.log(product);
  // product = await product.skip(Number(0)).limit(Number(2));
  return { total, items: product };
};

const listProducts = async (
  categoryId,
  { sortBy, sortByDesc, filter, limit = 20, skip = 0 }
) => {
  let sortCriteria = null;

  const total = await Products.countDocuments({ category: categoryId });
  let result = Products.find({ category: categoryId }).populate({
    path: "category",
    select: "name price",
  });
  if (sortBy) {
    sortCriteria = { [`${sortBy}`]: 1 };
  }
  if (sortByDesc) {
    sortCriteria = { [`${sortByDesc}`]: -1 };
  }
  if (filter) {
    result = result.select(filter.split("|").join(" "));
  }

  result = await result
    .skip(Number(skip))
    .limit(Number(limit))
    .sort(sortCriteria);
  return { total, limit, items: result };
};

const addProduct = async (categoryId, body) => {
  const product = await Products.create({ ...body, category: categoryId });
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
  getAllProducts,
  listProducts,
  addProduct,
  getProductById,
  removeProduct,
  updateProduct,
};
