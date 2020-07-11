const {
  client,
  getAllProducts,
  createProduct,
  updateProduct,
  getProductById,
  getAllUsers,
  createDetails,
  createUser,
  getUserInfo,
  createCategory,
  getAllCategories,
  getAllReviews,
  createReview,
  updateReview,
} = require("./index");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS products_categories;
      DROP TABLE IF EXISTS product_categories;
      DROP TABLE IF EXISTS categories;
      DROP TABLE IF EXISTS carts_products;
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS user_details;
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
          CREATE TABLE user_details (
              id SERIAL PRIMARY KEY,
              full_address varchar(255) NOT NULL,
              billing_address varchar(255) NOT NULL,
              credit_card NUMERIC NOT NULL,
              full_name varchar(255) NOT NULL,
              phone_number NUMERIC NOT NULL
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
              title varchar(255) NOT NULL,
              body varchar (255),
              rating integer NOT NULL DEFAULT 5 CONSTRAINT min_max CHECK (rating > 0 AND rating <= 5),
              user_id INTEGER REFERENCES users(id),
              product_id INTEGER REFERENCES products(id)
            );
    `);

    await client.query(`
    CREATE TABLE carts (
      id SERIAL PRIMARY KEY,
      users_id INTEGER REFERENCES users(id),
      total_price NUMERIC,
      checked_out BOOLEAN DEFAULT false
      );
    `);

    await client.query(`
      CREATE TABLE carts_products (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        carts_id INTEGER REFERENCES carts(id)
        quantity INTEGER NOT NULL,
        price NUMERIC NOT NULL
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
      username: "jasmineh",
      password: "jasmine123",
      email: "jasmine@redjags.com",
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
      price: "17.76",
      inventory: "50",
    });
    await createProduct({
      title: "String Cheese",
      description: "Stringy",
      price: ".99",
      inventory: "25",
    });
    await createProduct({
      title: 'Nacho Cheese',
      description: "It's my cheese! Nacho cheese!",
      price: '3.49',
      inventory: '25'
    });
    await createProduct({
      title: 'Pepperjack Cheese',
      description: 'Monterey Jack with a little kick',
      price: '4.99',
      inventory: '10'
    });
    await createProduct({
      title: 'Swiss Cheese',
      description: 'holy',
      price: '2.00',
      inventory: '12'
    })
    await createProduct({
      title: "Blue Cheese",
      description: "smells like old socks, tastes also like old socks",
      price: "7.25",
      inventory: "13",
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
      fullAddress: "715 Ridge San Luis Obispo, CA 93405",
	    billingAddress: "715 Ridge San Luis Obispo, CA 93405",
      cCard: "1234567890123456",
      fullName: "Patrick-V Herrera",
      phoneNumber:"8057103189"
    });

  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createInitialCategories() {
  try {
    await createCategory({
      categoryName: 'Stinky'
    });
    await createCategory({
      categoryName: 'Aged'
    });
    await createCategory({
      categoryName: 'Hard'
    });
    await createCategory({
      categoryName: 'Soft'
    });
    await createCategory({
      categoryName: 'Smokey'
    });
    await createCategory({
      categoryName: 'Fresh'
    });

    console.log('done creating initial categories')
  } catch (error) {
    throw error;
  }
}

async function createInitialReviews() {
  try {
    await createReview({
      title: 'This cheese stinks',
      body: 'I think this cheese has gone bad, delicious though.',
      rating: 4,
      userId: 1,
      productId: 6,
    })
    await createReview({
      title: 'low quality',
      body: 'rips to shreds when I pull on it',
      rating: 2,
      userId: 2,
      productId: 2,
    })
  } catch (error) {
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
    await createUserDetails();
    await createInitialCategories();
    await createInitialReviews();
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

    const userInfo = await getUserInfo();
    console.log ("User Info is...", userInfo)

    const categories = await getAllCategories();
    console.log("getAllCategories results: ", categories);

    const reviews = await getAllReviews();
    console.log("getAllReviews results: ", reviews);

    console.log("Done testing database...");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

rebuildDB().then(testDB);
