const { Client } = require('pg');
const chalk = require("chalk");

const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/graceshopper-dev";
const client = new Client(connectionString);

async function getAllProducts() {
    const { rows } = await client.query(`
        SELECT id, title, description, price, inventory
        FROM products;
        `);

    return rows;
}

async function getAllUsers() {
    const { rows } = await client.query(`
        SELECT id, name, username, password, email
        FROM users;
        `);

    return rows;
}

async function getProductById(productId) {
    try {
        const { rows: [product] } = await client.query(`
            SELECT *
            FROM products
            WHERE id=$1;
            `, [productId]);

        if(!product) {
            throw {
                name: 'ProductNotFoundError',
                description: 'Could not find product with that productId'
            }
        }

        return product;
    } catch(error) {
        console.error(error);
        throw error;
    }
}

async function getUserById(userId) {
    try {
        const { rows: [user] } = await client.query(`
            SELECT *
            FROM users
            WHERE id=$1;
            `, [userId]);

        if(!user) {
            throw {
                name: 'UserNotFoundError',
                description: 'Could not find user with that userId'
            }
        }

        return user
    } catch(error) {
        console.error(error);
        throw error;
    }
}

async function createProduct({
    title,
    description,
    price,
    inventory
}) {
    try {
        const { rows: [ product ] } = await client.query(`
            INSERT INTO products (title, description, price, inventory)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (title) DO NOTHING
            RETURNING *;
            `, [title, description, price, inventory]);

        return product;
    } catch(error) {
        console.error(error);
        throw error;
    }
}

async function createUser({
    name,
    username,
    password,
    email
}) {
    try {
        const { rows: [ user ] } = await client.query(`
            INSERT INTO users (name, username, password, email)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `, [name, username, password, email]);

        return user;
    } catch(error) {
        console.error(error);
        throw error;
    }
}

async function updateProduct(id, fields={}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if(setString.length === 0) {
        return;
    }

    try {
        const { rows: [ product ] } = await client.query(`
            UPDATE products
            SET ${ setString }
            WHERE id=${ id }
            RETURNING *;
            `, Object.values(fields));

        return product;
    } catch(error) {
        console.error(error);
        throw error;
    }
}

async function updateUser(id, fields={}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if(setString.length === 0) {
        return;
    }

    try {
        const { rows: [ user ] } = await client.query(`
            UPDATE users
            SET ${ setString }
            WHERE id=${ id }
            RETURNING *;
            `, Object.values(fields));

        return user;
    } catch(error) {
        console.error(error);
        throw error;
    }
}


module.exports = {
    client,
    getAllProducts,
    getAllUsers,
    createProduct,
    updateProduct,
    updateUser,
    createUser,
    getProductById,
    getUserById,
}
