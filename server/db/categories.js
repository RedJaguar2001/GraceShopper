const { client } = require("./client");

//GetAllCategories
async function getAllCategories() {
  const { rows } = await client.query(`
    SELECT *
    FROM categories;
  `);

  return rows;
}

//GetCategoryById
async function getCategoryById(categoryId) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
      SELECT *
      FROM categories
      WHERE id=$1;
    `,
      [categoryId]
    );

    if (!category) {
      throw {
        name: "CategoryNotFoundError",
        description: `Couldn't find category with Id: ${categoryId}`,
      };
    }

    return category;
  } catch (error) {
    throw error;
  }
}

async function createCategory({categoryName}) {
  if (!categoryName) {
    return null;
  }

  const {
    rows: [newCategory],
  } = await client.query(
    `
          INSERT INTO categories(name) VALUES($1)
          ON CONFLICT(name) DO NOTHING
          RETURNING *;
      `,
    [categoryName.toLowerCase()]
  );

  if (newCategory) {
    return newCategory;
  }

  const {
    rows: [existingCategory],
  } = await client.query(
    `
          SELECT * FROM tags
          WHERE tag=$1;
      `,
    [categoryName.toLowerCase()]
  );

  return existingCategory;
}

// creating multiple categories at once probably not needed but thought this method was neat and wanted the practice
async function createCategories(categoryNames) {
  if (!categoryNames || !categoryNames.length) {
    return [];
  }

  const insertValues = categoryNames
    .map((_, index) => `$${index + 1}`)
    .join("), (");

  try {
    const { row: categories } = await client.query(
      `
              INSERT INTO categories(name)
              VALUES (${insertValues})
              ON CONFLICT(name) DO UPDATE SET tag = EXCLUDED.tag
              RETURNING *;
          `,
      categoryNames.map((cat) => cat.toLowerCase())
    );

    return categories;
  } catch (error) {
    throw error;
  }
}

async function deleteCategory(categoryId) {
  if (!categoryId) {
    return false;
  }

  await client.query(
    `
          DELETE FROM product_categories
          WHERE $1=category_id;
      `,
    [categoryId]
  );

  await client.query(
    `
          DELETE FROM categories
          WHERE $1=id;
      `,
    [categoryId]
  );

  return true;
}

async function createProductCategory(productId, categoryId) {
  if (!productId || !categoryId) {
    return null;
  }

  const {
    rows: [productCategory],
  } = await client.query(
    `
          INSERT INTO product_categories(product_id, category_id)
          VALUES ($1, $2) ON CONFLICT (product_id, category_id) DO NOTHING
          RETURNING *;
      `,
    [productId, categoryId]
  );

  return productCategory;
}

async function deleteProductCategory(productId, categoryId) {
  if (!productId || !categoryId) {
    return false;
  }

  await client.query(
    `
          DELETE FROM product_categories
          WHERE product_id=$1 AND category_id=$2;
      `,
    [productId, categoryId]
  );

  return true;
}

async function addCategoriesToProduct(productId, categoryList) {
  try {
    const createProductCategoryPromises = categoryList.map(
      category => createProductCategory(productId, category.id)
    );

    await Promise.all(createProductCategoryPromises);
    return await getProductById(productId);

  } catch (error) {
    throw error;
  }
}



module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  createCategories,
  deleteCategory,
  createProductCategory,
  deleteProductCategory,
  addCategoriesToProduct,
};
