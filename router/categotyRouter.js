const express = require("express");
const router = express.Router();
const {
  newCategory,
  getAllCategory,
  readCategory,
  updateCategory,
  deleteCategory,
  NewCategory,
} = require("../controller/categoryController");
router.route("/").get(getAllCategory).post(NewCategory);
router
  .route("/:id")
  .get(readCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
