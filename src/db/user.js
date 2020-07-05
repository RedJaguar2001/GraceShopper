const { client } = require('./client')



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



async function createDetails({ fulladdress, billingaddress, cCard, fullname, phonenumber }) {
  try {
    const {
      rows: [userDetails],
    } = await client.query(
      `
            INSERT INTO userdetails (fulladdress, billingaddress, cCard, fullname, phonenumber)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
            `,
      [fulladdress, billingaddress, cCard, fullname, phonenumber]
    );

    return userDetails;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserInfo() {
  const { rows } = await client.query(`
        SELECT id, fulladdress, billingaddress, cCard, fullname, phonenumber
        FROM userdetails;
        `);

  return rows;
}

module.exports = {
  createUser, getAllUsers, createDetails, getUserInfo
}