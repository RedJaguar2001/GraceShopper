const {client} = require('./client');

async function createOrUpdateCartProduct(cartId, productId, quantity) {

    const {rows : [{price}]} = await client.query(`
        UPDATE products
        SET inventory=inventory-$1
        WHERE id=$2
        RETURNING price;
    `, [quantity, productId]);

    const {rows : [cartProduct]} = await client.query(`
        INSERT INTO carts_products (product_id, carts_id, quantity, price)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (product_id, carts_id)
        DO UPDATE SET quantity = EXCLUDED.quantity + carts_products.quantity
        RETURNING *;
    `, [productId, cartId, quantity, price]);

    return cartProduct;
}

async function getCartProductsQuantity(productId, cartId) {
    const { rows: [cartProduct] } = await client.query(
      `
          SELECT quantity
          FROM carts_products
          WHERE product_id=$1 AND carts_id=$2;
          `,
      [productId, cartId]
    );
  
    console.log(cartProduct);
    return cartProduct ? cartProduct.quantity : 0;
  }

module.exports = {
    createOrUpdateCartProduct,
    getCartProductsQuantity,
    }