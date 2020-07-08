const { client } = require("./client");

async function createUser({ name, username, password, email }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users (name, username, password, email)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `,
      [name, username, password, email]
    );

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllUsers() {
  const { rows } = await client.query(`
        SELECT id, name, username, password, email
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

module.exports = {
  createUser,
  getAllUsers,
  createDetails,
  getUserInfo,
  updateUser,
  getUserById,
};
