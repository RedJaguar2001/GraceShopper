const { client } = require("./client");

async function createCart(userId) {
  try {
    const {
      rows: [cart]
    } = await client.query(
      `
      INSERT INTO carts (users_id)
      VALUES ($1)
      RETURNING *;
      `,
      [userId]
    );

    return cart;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllCarts() {
  const { rows } = await client.query(`
  SELECT *
  FROM carts;
  `);
  return rows;
}

// deleteCart
async function deleteCart(cartId) {
  if (!cartId) {
    return false;
  }

  await client.query(`
  DELETE FROM cart
  WHERE $1=cartId;
  `);
}

//updateCart(patch)
async function updateCart(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [cart]
    } = await client.query(
      `Update carts
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
    `,
      Object.values(fields)
    );
    return cart;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getCartById(cartId) {
  try {
    const {
      rows: [cart]
    } = await client.query(
      `
    SELECT * FROM carts
    WHERE id=$1;
    `,
      [cartId]
    );

    if (!cart) {
      throw {
        name: "CartNotFoundError",
        description: "Could not find cart with that cartId"
      };
    }
    return cart;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getActiveCartByUserId(userId) {
  try {
    const {
      rows: [cart]
    } = await client.query(
      `
    SELECT * FROM carts
    WHERE users_id=$1
    AND checked_out=false;
    `,
      [userId]
    );

    if (cart) {
      return cart;
    }
    return createCart(userId);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getOrderHistoryByUserId(userId) {
  try {
    const { rows: carts } = await client.query(
      `
    SELECT c.id, cp.price, cp.quantity, cp.product_id, p.title FROM carts c
    INNER JOIN carts_products cp ON c.id=cp.carts_id
    INNER JOIN products p ON p.id=cp.product_id
    WHERE users_id=$1
    AND checked_out=true;
    `,
      [userId]
    );

    if (carts.length) {
      return Object.values(
        carts.reduce((acc, { id, product_id, quantity, price, title }) => {
          const cartProduct = {
            productId: product_id,
            quantity,
            price,
            title
          };

          if (id in acc) {
            acc[id].products.push(cartProduct);
          } else {
            acc[id] = {
              id,
              products: [cartProduct]
            };
          }

          return acc;
        }, {})
      );
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function doesCartExist(userId) {
  if (!userId) {
    return false;
  }

  const {
    rows: [cart]
  } = await client.query(
    `
    SELECT id FROM carts
    WHERE users_id=$1;
    `,
    [userId]
  );

  return !!cart;
}

async function activeCartProducts(userId) {
  const { rows } = await client.query(
    `
  SELECT * FROM carts c
  LEFT JOIN carts_products cp ON c.id = cp.carts_id
  LEFT JOIN products p ON cp.product_id = p.id
  WHERE users_id=$1
  AND checked_out=false;
  `,
    [userId]
  );

  return rows;
}

module.exports = {
  createCart,
  getAllCarts,
  deleteCart,
  updateCart,
  getCartById,
  getActiveCartByUserId,
  getOrderHistoryByUserId,
  doesCartExist,
  activeCartProducts
};

// LEFT JOIN products_images pi ON pi.productId = p.id