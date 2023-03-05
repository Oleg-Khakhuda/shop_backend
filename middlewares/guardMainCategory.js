import repositoryMainCategory from "../repository/mainCategory";

const guardMainCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  //   console.log(req.params.id);
  const mainCategory = await repositoryMainCategory.getMainCategoryById(
    categoryId
  );
  req.mainCategory = mainCategory;
  //   console.log(mainCategory);
  next();
};

export default guardMainCategory;
