const { client } = require("./client");

async function getAllProducts() {
  const { rows } = await client.query(`
          SELECT *
          FROM products p
          LEFT JOIN product_categories pc ON pc.product_id=p.id
          LEFT JOIN categories c ON pc.category_id=c.id;
          `);

  return rows;
}
//Associate a product with at least one category
//After that, map the rows returned from getAllProducts into something more useful (look at the data structure)
// {...productcolumns, categories (an array of strings where each string is a cteogry //that the prodoct belongs to)}
//on the front end, use category state and .categories to filter the products before filtering by search state

async function getProductById(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
              SELECT *
              FROM products
              WHERE id=$1;
              `,
      [productId]
    );

    const {
      rows: [image],
    } = await client.query(
      `
        SELECT images.*
        FROM images
        JOIN products_images ON images.id=products_images."imageId"
        WHERE products_images."productId"=$1;
        `, [productId]);

      if (!product) {
        throw {
          name: "ProductNotFoundError",
          description: "Could not find product with that productId",
        };
      }

      product.image = image;

      return product;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

async function createProduct({ title, description, price, inventory }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
              INSERT INTO products (title, description, price, inventory)
              VALUES ($1, $2, $3, $4)
              ON CONFLICT (title) DO NOTHING
              RETURNING *;
              `,
        [title, description, price, inventory]
      );

      return product;
    } catch (error) {
      console.error(error);
      throw error;
    }
}

async function updateProduct(id, fields = {}) {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");

    if (setString.length === 0) {
      return;
    }

    try {
      const {
        rows: [product],
      } = await client.query(
        `
              UPDATE products
              SET ${setString}
              WHERE id=${id}
              RETURNING *;
              `,
        Object.values(fields)
      );

      return product;
    } catch (error) {
      console.error(error);
      throw error;
    }
}

async function deleteProduct(productId) {
  if (!productId) {
    return false;
  }

  await client.query(
    `
    DELETE FROM products_images
    WHERE "productId"=$1;
    `,
    [productId]
  );

  await client.query(
    `
    DELETE FROM product_categories
    WHERE product_id=$1;
    `,
    [productId]
  );

  await client.query(
    `
    DELETE FROM reviews
    WHERE product_id=$1;
    `,
    [productId]
  );

  await client.query(
    `
    DELETE FROM carts_products
    WHERE product_id=$1;
    `,
    [productId]
  );

  await client.query(
    `
    DELETE FROM products
    WHERE id=$1;
    `,
    [productId]
  );

  return true;
}

async function getProductQuantity(productId) {
  const {
    rows: [product],
  } = await client.query(
    `
        SELECT inventory
        FROM products
        WHERE id=$1;
        `,
    [productId]
  );

  return product ? product.inventory : null;
}

module.exports = {

    getAllProducts,
    createProduct,
    updateProduct,
    getProductById,
    deleteProduct,
    getProductQuantity
}
