/*
-Orders must belong to a user OR guest session (authenticated vs unauthenticated)
-Orders must contain line items that capture the price, current product ID and quantity
-If a user completes an order, that order should keep the price of the item at the time when they checked out even if the price of the product later changes*/

const { client } = require("./client");

async function createCart(userId) {
  try {
    const {
      rows: [cart],
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
      rows: [cart],
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
      rows: [cart],
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
        description: "Could not find cart with that cartId",
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
      rows: [cart],
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

// async function getInactiveCartByUserId(userId) {
//   try {
//     const { rows: carts } = await client.query(
//       `
//     SELECT * FROM carts
//     WHERE users_id=$1
//     AND checked_out=true;
//     `,
//       [userId]
//     );

//     if (carts.length) {
//       return carts;
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

async function getInactiveCartByUserId(userId) {
  try {
    const { rows: carts } = await client.query(
      `
    SELECT * FROM carts
    WHERE users_id=$1
    AND checked_out=true;
    `,
      [userId]
    );

    if (carts.length) {
      console.log("Your carts:");
      carts.map( async (cart) => {
        try {
          const { rows: cartProducts } = await client.query(`
          SELECT carts_products.*
          FROM carts_products
          JOIN products ON carts_products.product_id = products.id
          WHERE carts_id=$1
          ;`, [cart.id]);

          console.log(cartProducts);
        } catch (error) {
          throw error;
        }
      });
      return carts;
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
    rows: [cart],
  } = await client.query(
    `
    SELECT id FROM carts
    WHERE users_id=$1;
    `,
    [userId]
  );

  return !!cart;
}

module.exports = {
  createCart,
  getAllCarts,
  deleteCart,
  updateCart,
  getCartById,
  getActiveCartByUserId,
  getInactiveCartByUserId,
  doesCartExist,
};
