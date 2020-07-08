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
async function deleteCart() {
  const {rows} = await client.query(`
  DELETE id, productId, price, quantity
  FROM carts
  `)
}

//updateCart(patch)

module.exports = {
  createCart, 
  getAllCarts,
  deleteCart,
}
