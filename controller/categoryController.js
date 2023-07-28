const asyncHandler = require("../middleware/asyncHandler");
const Category = require("../model/category");
exports.NewCategory = asyncHandler(async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json({
      success: true,
      newCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
});
exports.getAllCategory = async (req, res, next) => {
  try {
    const allCategory = await Category.find();
    res.status(200).json({
      success: true,
      allCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

exports.readCategory = asyncHandler(async (req, res, next) => {
  try {
    const readCategory = await Category.findById(req.params.id);
    res.status(200).json({
      success: true,
      readCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: 500,
      error,
    });
  }
});
exports.updateCategory = asyncHandler(async (req, res, next) => {
  try {
    const updateCategory = await Category.findByIdAndUpdate(req.params.id);
    res.status(200).json({
      success: true,
      updateCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: 500,
      error,
    });
  }
});
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  try {
    const deleteCategory = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      deleteCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: 500,
      error,
    });
  }
});
