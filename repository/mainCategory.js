import MainCategories from "../model/mainCategory";

const getMainCategories = async () => {
  const result = await MainCategories.find();
  return result;
};

const addMainCategory = async (body) => {
  // console.log(body);
  const category = await MainCategories.create(body);
  return category;
};

const getMainCategoryById = async (categoryId) => {
  const result = await MainCategories.findById(categoryId);
  // console.log(result);
  return result;
};

const removeMainCategory = async (categoryId) => {
  const result = await MainCategories.findOneAndRemove({ _id: categoryId });
  return result;
};

const updateMainCategory = async (categoryId, body) => {
  const result = await MainCategories.findByIdAndUpdate(
    categoryId,
    { ...body },
    { new: true }
  );
  return result;
};

export default {
  getMainCategories,
  addMainCategory,
  getMainCategoryById,
  removeMainCategory,
  updateMainCategory,
};
