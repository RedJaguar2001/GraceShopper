const { client } = require("./client");

async function getAllProducts() {
  const { rows } = await client.query(`
          SELECT *
          FROM products;
          `);

  return rows;
}

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
        `,
      [productId]
    );

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
  try {
    await client.query(
      `
            DELETE FROM products
            WHERE id=$1;
            `,
      [productId]
    );

    return `DELETED PRODUCT NUMBER: ${productId}`;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getProductQuantity(productId) {
  const { rows: [product] } = await client.query(
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
};
