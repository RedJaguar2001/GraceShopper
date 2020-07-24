const express = require("express");
const categoriesRouter = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
} = require("../db");

const bodyParser = require("body-parser");
categoriesRouter.use(bodyParser.json());

categoriesRouter.use((req, res, next) => {
  console.log("A request is being made to /categories");

  next();
});

categoriesRouter.get("/", async (req, res) => {
  try {
    const categories = await getAllCategories();

    res.send({
      message: "successfully retrieved all categories",
      data: categories,
      status: true,
    });
  } catch (error) {
    next(error);
  }
});

categoriesRouter.post("/", async (req, res, next) => {
  const { name } = req.body;

  try {
    const category = await createCategory({
      name,
    });

    res.send({
      message: "new category created",
      data: category,
      status: true,
    });
  } catch (error) {
    next(error);
  }
});

categoriesRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCategory = await deleteCategory(id);

    res.send({
      message: `deleting category ${deletedCategory ? "successful" : "failed"}`,
      status: deletedCategory,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = categoriesRouter;
