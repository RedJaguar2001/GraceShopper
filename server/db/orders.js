/*
-Orders must belong to a user OR guest session (authenticated vs unauthenticated)
-Orders must contain line items that capture the price, current product ID and quantity
-If a user completes an order, that order should keep the price of the item at the time when they checked out even if the price of the product later changes*/

const { client } = require('./client')

async function createCart(
  productId,
  price,
  quantity = {}) {
  try {
    const {
      rows: [],
    } = await client.query(`
      INSERT INTO cart ( id, productId, price, quantity)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `, [id, productId, price, quantity]
    )
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllCarts() {
  const {rows} = await client.query(`
  SELECT id, productId, price, quantity
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
  `)
}

//updateCart(patch)
async function updateCart(id, fields = {}) {
  const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(", ");

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
    `, Object.values(fields)
    );
    return carts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getCartById(cartId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
    SELECT * FROM carts
    WHERE id=$1;
    `, [cartId]
    );

    if(!cart) {
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


module.exports = {
  createCart,
  getAllCarts,
  deleteCart,
  updateCart,
  getCartById,
  
}
