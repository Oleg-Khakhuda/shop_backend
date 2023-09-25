import Categories from "../model/category";

const getAllCategories = async () => {
  const total = await Categories.countDocuments();
  const result = await Categories.find();
  return { total, items: result };
};

const getCategories = async (categoryId) => {
  const total = await Categories.countDocuments({ mainCategory: categoryId });
  console.log(total);
  let result = await Categories.find({ mainCategory: categoryId }).populate({
    path: "mainCategory",
    select: "title",
  });
  return { total, items: result };
};

const addCategory = async (categoryId, body) => {
  const category = await Categories.create({
    ...body,
    mainCategory: categoryId,
  });
  return category;
};

const getCategoryById = async (categoryId) => {
  const result = await Categories.findOne({ _id: categoryId });
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
  getAllCategories,
  getCategories,
  addCategory,
  getCategoryById,
  removeCategory,
  updateCategory,
};
