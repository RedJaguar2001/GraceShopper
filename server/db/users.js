const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { client } = require("./client");

// turn a callback based async function into a promise
const promisifiedHash = (password) => new Promise((resolve, reject) => {
  bcrypt.hash(password, 10, (error, hash) => {
      if (error)
        reject(error);
      else
        resolve(hash);
  });
});

const promisifiedSign = (id) => new Promise((resolve, reject) => {
  jwt.sign({ id }, process.env.SECRET, (error, token) => {
    if (error)
      reject(error);
    else
      resolve(token);
  });
});

async function createUser({ name, username, password, email }) {
  // always hash passwords before storing them in DBs
  // storing plain text passwords is VERY BAD PRACTICE
  // you might get fired for it
  const hashedPassword = await promisifiedHash(password);

  const {
    rows: [user],
  } = await client.query(
    `
          INSERT INTO users (name, username, password, email)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (email) DO NOTHING
          RETURNING *;
          `,
    [name, username, hashedPassword, email]
  );

  if (!user) {
    throw new Error("Server error: Failed to create the user.");
  }

  // create a token for the new user
  const token = await promisifiedSign(user.id);

  return [user, token];
}

async function getAllUsers() {
  const { rows } = await client.query(`
        SELECT *
        FROM users;
        `);

  return rows;
}

async function createDetails({
  fullAddress,
  billingAddress,
  cCard,
  fullName,
  phoneNumber,
}) {
  try {
    const {
      rows: [userDetails],
    } = await client.query(
      `
            INSERT INTO user_details (full_address, billing_address, credit_card, full_name, phone_number)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
            `,
      [fullAddress, billingAddress, cCard, fullName, phoneNumber]
    );

    return userDetails;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserInfo() {
  const { rows } = await client.query(`
        SELECT id, full_address, billing_address, credit_card, full_name, phone_number
        FROM user_details;
        `);

  return rows;
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE id=$1;
            `,
      [userId]
    );

    if (!user) {
      throw {
        name: "UserNotFoundError",
        description: "Could not find user with that userId",
      };
    }

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateUser(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
            UPDATE users
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
            `,
      Object.values(fields)
    );

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function doesUserExist(username, email) {
  if (
    typeof username !== "string"
    || typeof email !== "string"
  ) {
    throw new Error("username and email must be strings.");
  }

  const usernameQuery = await client.query(`
    SELECT id FROM users
    WHERE username = $1;
  `, [username]);

  if (usernameQuery.rows.length > 0) {
    return [true, "username"];
  }

  const emailQuery = await client.query(`
    SELECT id FROM users
    WHERE email = $1;
  `, [email]);

  if (emailQuery.rows.length > 0) {
    return [true, "email"];
  }

  return [false, ""];
}

module.exports = {
  createUser,
  getAllUsers,
  createDetails,
  getUserInfo,
  updateUser,
  getUserById,
  doesUserExist
};
