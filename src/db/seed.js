const {
  client,
  getAllProducts,
  createProduct,
  updateProduct,
  updateUser,
  getProductById,
  getUserById,
} = require("./index");

const {getAllUsers, createDetails, createUser, getUserInfo} = require("./user")

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS products_categories;
      DROP TABLE IF EXISTS product_categories;
      DROP TABLE IF EXISTS categories;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS userDetails;
    `);

    console.log("Done dropping tables...");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
          CREATE TABLE products (
              id SERIAL PRIMARY KEY,
              title varchar(255) UNIQUE NOT NULL,
              description varchar(255) NOT NULL,
              price NUMERIC NOT NULL,
              inventory INTEGER NOT NULL
          );
    `);

    await client.query(`
          CREATE TABLE users (
              id SERIAL PRIMARY KEY,
              name varchar(255) NOT NULL,
              username varchar(255) UNIQUE NOT NULL,
              password varchar(255) NOT NULL,
              email varchar(255) UNIQUE NOT NULL
          );
    `);

    await client.query(`
    CREATE TABLE userDetails (
        id SERIAL PRIMARY KEY,
        fulladdress varchar(255) NOT NULL,
        billingaddress varchar(255) NOT NULL,
        cCard NUMERIC NOT NULL,
        fullname varchar(255) NOT NULL,
        phonenumber NUMERIC NOT NULL
        );
    `);



    await client.query(`
          CREATE TABLE categories (
            id SERIAL PRIMARY KEY,
            name varchar(255) UNIQUE NOT NULL
            );
    `);

    await client.query(`
          CREATE TABLE product_categories (
            id SERIAL PRIMARY KEY,
            product_id INTEGER REFERENCES products(id),
            category_id INTEGER REFERENCES categories(id)
          );
    `);

    await client.query(`
            CREATE TABLE reviews (
              id SERIAL PRIMARY KEY,
              name varchar(255) NOT NULL,
              rating integer NOT NULL DEFAULT 5 CONSTRAINT min_max CHECK (rating > 0 AND rating <= 5),
              user_id INTEGER REFERENCES users(id),
              product_id INTEGER REFERENCES products(id)
            );
    `);

    console.log("Done building tables...");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createInitialUsers() {
  try {
    await createUser({
      name: "Kevin H",
      username: "khassenkamp",
      password: "kevin123",
      email: "kevinH@redjags.com",
    });
    await createUser({
      name: "Brian B",
      username: "brian",
      password: "password",
      email: "brian",
    });
    await createUser({
      name: "Jasmine H",
      username: "jasmine",
      password: "jasmine",
      email: "jasmine",
    });
    await createUser({
      name: "Patrick H",
      username: "patrick",
      password: "patrick",
      email: "patrick",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createInitialProduct() {
  try {
    // console.log('Starting to create initial product...');

    await createProduct({
      title: "American Cheese",
      description: "Goes great with burgers!",
      price: "2.99",
      inventory: "10",
    });
    await createProduct({
      title: "String Cheese",
      description: "Stringy",
      price: ".99",
      inventory: "25",
    });

    // console.log('Done creating initial product');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createUserDetails() {
  try {
    await createDetails({
      fulladdress: "715 Ridge San Luis Obispo, CA 93405",
	    billingaddress: "715 Ridge San Luis Obispo, CA 93405",
      cCard: "1234567890123456",
      fullname: "Patrick-V Herrera",
      phonenumber:"8057103189"
    });

  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function rebuildDB(force = true) {
  try {
    client.connect();

    if (force) {
      await dropTables();
    }

    await createTables();
    await createInitialProduct();
    await createInitialUsers();
    await createUserDetails()
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    console.log("Calling getAllProducts...");
    const products = await getAllProducts();
    console.log("getAllProducts result:", products);

    console.log("Calling updateProducts...");
    const updatedProduct = await updateProduct(products[0].id, {
      title: "Cheddar Cheese",
      description: "Yummy in my tummy",
      price: "4.99",
      inventory: "5",
    });
    console.log("updateProduct result:", updatedProduct);

    const getProduct = await getProductById(2);
    console.log("gotten product:", getProduct);

    const users = await getAllUsers();
    console.log("getAllUsers result:", users);

    const userinfo = await getUserInfo();
    console.log ("User Info is...", userinfo)

    console.log("Done testing database...");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

rebuildDB().then(testDB);
