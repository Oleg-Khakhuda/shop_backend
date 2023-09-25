import repositoryCategory from "../repository/category";

const guardCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  // console.log(req.params.id);
  const category = await repositoryCategory.getCategoryById(categoryId);
  req.category = category;
  //   console.log(category);
  next();
};

export default guardCategory;
