import Categories from "../model/category";

const getCategories = async () => {
  const result = await Categories.find();
  return result;
};

const addCategory = async (body) => {
  const category = await Categories.create(body);
  return category;
};

const getCategoryById = async (categoryId) => {
  console.log(categoryId);
  const result = await Categories.findById(categoryId);
  return result;
};

const removeCategory = async (categoryId) => {
  const result = await Categories.findOneAndRemove({ _id: categoryId });
  return result;
};

const updateCategory = async (categoryId, body) => {
  const result = await Categories.findByIdAndUpdate(
    categoryId,
    { ...body },
    { new: true }
  );
  return result;
};

export default {
  getCategories,
  addCategory,
  getCategoryById,
  removeCategory,
  updateCategory,
};
