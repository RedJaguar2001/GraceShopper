require("dotenv").config();

const {
  client,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllUsers,
  createDetails,
  createUser,
  getUserInfo,
  createCategory,
  getAllCategories,
  createImage,
  getAllImages,
  getImageById,
  getAllReviews,
  createReview,
  updateReview,
  createProductImage,
  getActiveCartByUserId,
  createOrUpdateCartProduct
} = require("./index");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
      DROP TABLE IF EXISTS products_images;
      DROP TABLE IF EXISTS images;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS products_categories;
      DROP TABLE IF EXISTS product_categories;
      DROP TABLE IF EXISTS categories;
      DROP TABLE IF EXISTS carts_products;
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS user_details;
      DROP TABLE IF EXISTS users;
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
      CREATE TABLE images (
        id SERIAL PRIMARY KEY,
        title varchar(255) UNIQUE NOT NULL,
        img_src varchar(255) NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title varchar(255) UNIQUE NOT NULL,
        description text NOT NULL,
        price NUMERIC NOT NULL,
        inventory INTEGER NOT NULL
        );
      `);

    await client.query(`
      CREATE TABLE products_images (
        "productId" INTEGER REFERENCES products(id),
        "imageId" INTEGER REFERENCES images(id),
        UNIQUE ("productId", "imageId")
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
        users_id integer REFERENCES users(id),
        first_name varchar(255) NOT NULL,
        last_name varchar(255) NOT NULL,
        full_address varchar(255) NOT NULL,
        billing_address varchar(255) NOT NULL,
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
        category_id INTEGER REFERENCES categories(id),
        UNIQUE(product_id, category_id)
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
        checked_out BOOLEAN DEFAULT false
        );
    `);

    await client.query(`
      CREATE TABLE carts_products (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        carts_id INTEGER REFERENCES carts(id),
        quantity INTEGER NOT NULL,
        price NUMERIC NOT NULL,
        UNIQUE (product_id, carts_id)
        );
    `);

    console.log("Done building tables...");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createInitialImages() {
  try {
    await createImage({
      title: "Swiss cheese",
      img_src:
        "https://www.ecosystemmarketplace.com/wp-content/uploads/2019/11/Swiss-Cheese.jpg"
    });

    await createImage({
      title: "String Cheese",
      img_src:
        "https://vaya.in/recipes/wp-content/uploads/2018/06/String-Cheese.jpg"
    });

    await createImage({
      title: "Nacho Cheese",
      img_src:
        "https://3.bp.blogspot.com/-WYAtV46vDRg/UiFQQvekJkI/AAAAAAAAhaw/HvG8J7ay6ik/s1600/IMG_4515.JPG"
    });

    await createImage({
      title: "Bleu Cheese",
      img_src:
        "https://images.immediate.co.uk/production/volatile/sites/4/2019/10/GettyImages-596053834-c-9c9505d.jpg?quality=90&resize=768,574"
    });

    await createImage({
      title: "PepperJack Cheese",
      img_src:
        "https://www.culturesforhealth.com/learn/wp-content/uploads/2016/04/Pepper-Jack-Cheese-Recipe_header.jpg"
    });

    await createImage({
      title: "American Cheese",
      img_src: "https://cdn.schwans.com/media/images/products/62172-1-1540.jpg"
    });

    await createImage({
      title: "Cheddar Cheese",
      img_src:
        "https://www.hickoryfarms.com/dw/image/v2/AAOA_PRD/on/demandware.static/-/Sites-Web-Master-Catalog/default/dw3013ac58/images/products/smoked-cheddar-blend-3037-1.jpg?sw=815&sh=815&sm=fit"
    });

    await createImage({
      title: "Cheese Board",
      img_src:
        "https://assets.pbimgs.com/pbimgs/ab/images/dp/wcm/202015/0006/chateau-acacia-wood-cheese-boards-c.jpg"
    });

    await createImage({
      title: "Cheese Knives",
      img_src:
        "https://images-na.ssl-images-amazon.com/images/I/61zeuZNMWzL._AC_SL1500_.jpg"
    });

    await createImage({
      title: "Cheese Markers",
      img_src:
        "https://cdn.shopify.com/s/files/1/0095/2912/products/DSC_5434_1024x1024.jpg?v=1543344176"
    });

    await createImage({
      title: "Parmesan Cheese",
      img_src:
        "https://www.thespruceeats.com/thmb/nfMcJB5tlMZTWOVXP4b4FqqbQ6M=/1414x1414/smart/filters:no_upscale()/Parmesan-cheese-GettyImages-117078872-5873ca725f9b584db3463216.jpg"
    });

    await createImage({
      title: "Mozzarella Cheese",
      img_src:
        "https://www.gourmetfoodstore.com/images/product/large/6421_1_.jpg"
    });

    await createImage({
      title: "Ricotta Cheese",
      img_src:
        "https://www.culinaryhill.com/wp-content/uploads/2019/02/How-to-Make-Ricotta-Cheese-Culinary-Hill-Square-HR-07-e1579202065634.jpg"
    });

    await createImage({
      title: "Brie Cheese",
      img_src:
        "https://cdn.shopify.com/s/files/1/2836/2982/products/brie-recipe_grande.jpg?v=1533088694"
    });

    await createImage({
      title: "Tete de Moine Cheese",
      img_src: "https://www.igourmet.com/images/productsLG/tetedemoine.jpg"
    });

    await createImage({
      title: "Muenster Cheese",
      img_src:
        "https://cdn.shopify.com/s/files/1/0150/0232/products/Pearl_Valley_Meunster_Slices_grande.jpg?v=1534870969"
    });

    await createImage({
      title: "Cream Cheese",
      img_src:
        "https://www.willcookforsmiles.com/wp-content/uploads/2019/11/Cream-Cheese-Frosting-4-1-of-1.jpg"
    });
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
      email: "kevinH@redjags.com"
    });
    await createUser({
      name: "Brian B",
      username: "brian",
      password: "password",
      email: "brian"
    });
    await createUser({
      name: "Jasmine H",
      username: "jasmineh",
      password: "jasmine123",
      email: "jasmine@redjags.com"
    });
    await createUser({
      name: "Patrick H",
      username: "patrick",
      password: "patrick",
      email: "patrick"
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createInitialProduct() {
  try {
    await createProduct({
      title: "American Cheese",
      description:
        "Daft Deli Reflux American Cheese Slices are Great on burgers and that's probably it. Enjoy some sliced American cheese with a new improved non-grainy texture and not much flavor that goes great on burgers like we said, just burgers. Comes Pre-sliced because you're too lazy to take two seconds to cut, that's why it's called American Cheese! Draft Deli Reflux cheese is made with ingredients. Our slices contain content. For optimum flavor, don't eat. Our sliced reflux American cheese elevates any burger for 4th of July or Labor Day BBQs. Note: do not attempt to eat without burger patty.",
      price: "17.76",
      inventory: "50"
    });
    await createProduct({
      title: "String Cheese",
      description: "Stringy",
      price: ".99",
      inventory: "50"
    });
    await createProduct({
      title: "Nacho Cheese",
      description: "It's my cheese! Nacho cheese!",
      price: "3.49",
      inventory: "50"
    });
    await createProduct({
      title: "Pepperjack Cheese",
      description: "Monterey Jack with a little kick",
      price: "4.99",
      inventory: "50"
    });
    await createProduct({
      title: "Swiss Cheese",
      description: "holy",
      price: "2.00",
      inventory: "50"
    });
    await createProduct({
      title: "Parmesan Cheese",
      description: "Everybody's favorite topper",
      price: "3.99",
      inventory: "50"
    });
    await createProduct({
      title: "Mozzarella Cheese",
      description: "What else are you gonna make pizza with?",
      price: "3.99",
      inventory: "50"
    });
    await createProduct({
      title: "Ricotta Cheese",
      description: "Creamy and delicious!",
      price: "2.99",
      inventory: "50"
    });
    await createProduct({
      title: "Brie Cheese",
      description: "Tastes better than it looks",
      price: "6.99",
      inventory: "50"
    });
    await createProduct({
      title: "Tete de Moine Cheese",
      description: "Faancy!",
      price: "49.99",
      inventory: "50"
    });
    await createProduct({
      title: "MuensterCheese",
      description: "Perfect for all your grilled cheese needs!",
      price: "3.99",
      inventory: "50"
    });
    await createProduct({
      title: "Cream Cheese",
      description: "The perfect pair to every bagel",
      price: "2.99",
      inventory: "50"
    });
    await createProduct({
      title: "Cheese Board",
      description: "Handcrafted wooden board to display cheese",
      price: "25.00",
      inventory: "50"
    });
    await createProduct({
      title: "Cheese Knives",
      description: "Knives perfect for cutting the cheese",
      price: "9.99",
      inventory: "50"
    });
    await createProduct({
      title: "Cheese Markers",
      description: "Describes your cheese in case you forgot",
      price: "4.99",
      inventory: "50"
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createProductCategory(product_id, category_id) {
  try {
    await client.query(
      `
    INSERT INTO product_categories(product_id, category_id)
    VALUES ($1, $2)
    ON CONFLICT (product_id, category_id) DO NOTHING;
    `,
      [product_id, category_id]
    );
  } catch (error) {
    console.log('error in createProductCategory');
    throw error;
  }
}

async function createKevinCart() {
  const users = await getAllUsers();
  const kevin = users.find(
    (user) => user.name === "Kevin H"
  )

  const activeCart = await getActiveCartByUserId(kevin.id);

  const products = await getAllProducts();

  await Promise.all(products.map(
    (product) => createOrUpdateCartProduct(activeCart.id, product.id, 2)
  ))
};

async function createUserDetails() {
  try {
    await createDetails({
      full_address: "715 Ridge San Luis Obispo, CA 93405",
      billing_address: "715 Ridge San Luis Obispo, CA 93405",
      first_name: "Patrick-Vincent",
      last_name: "Herrera",
      phone_number: "8057103189",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createInitialCategories() {
  try {
    await createCategory({
      categoryName: "Stinky"
    });
    await createCategory({
      categoryName: "Aged"
    });
    await createCategory({
      categoryName: "Hard"
    });
    await createCategory({
      categoryName: "Soft"
    });
    await createCategory({
      categoryName: "Smokey"
    });
    await createCategory({
      categoryName: "Fresh"
    });

    console.log("done creating initial categories");
  } catch (error) {
    throw error;
  }
}

async function createInitialReviews() {
  try {
    await createReview({
      title: "This cheese stinks",
      body: "I think this cheese has gone bad, delicious though.",
      rating: 4,
      userId: 1,
      productId: 6
    });
    await createReview({
      title: "low quality",
      body: "rips to shreds when I pull on it",
      rating: 2,
      userId: 2,
      productId: 2
    });
  } catch (error) {
    throw error;
  }
}

async function createInitialImage() {
  try {
    console.log("Starting to create image...");

    await createProductImage(1, 6);
    await createProductImage(2, 2);
    await createProductImage(3, 3);
    await createProductImage(6, 11);
    await createProductImage(5, 1);
    await createProductImage(4, 5);
    await createProductImage(7, 12);
    await createProductImage(8, 13);
    await createProductImage(9, 14);
    await createProductImage(10, 15);
    await createProductImage(11, 16);
    await createProductImage(12, 17);
    await createProductImage(13, 8);
    await createProductImage(14, 9);
    await createProductImage(15, 10);

    console.log("Finished creating image");
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function createInitialProductCategories() {
  try {
    const products = await client.query(`SELECT * FROM products;`);
    const categories = await client.query(`SELECT * FROM categories;`);
      console.log('productrows', products.rows)
      console.log('categoryrows', categories.rows)
    const productCategoryPromises = [];

    products.rows.forEach((product, i)=>{
      productCategoryPromises.push(createProductCategory(product.id, categories.rows[i % categories.rows.length].id));
      productCategoryPromises.push(createProductCategory(product.id, categories.rows[(i + 1) % categories.rows.length].id));
    });

    await Promise.all(productCategoryPromises);
  } catch (error) {
    console.error(error);
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
    await createInitialImages();
    await createInitialReviews();
    await createInitialImage();
    await createKevinCart();
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
    // const updatedProduct = await updateProduct(products[3].id, {
    //   title: "Cheddar Cheese",
    //   description: "Yummy in my tummy",
    //   price: "4.99",
    //   inventory: "50",
    // });
    // console.log("updateProduct result:", updatedProduct);

    const getProduct = await getProductById(2);
    console.log("gotten product:", getProduct);

    const users = await getAllUsers();
    console.log("getAllUsers result:", users);

    const userInfo = await getUserInfo();
    console.log("User Info is...", userInfo);

    const categories = await getAllCategories();
    console.log("getAllCategories results: ", categories);

    const images = await getAllImages();
    console.log("getAllImages...", images);

    const reviews = await getAllReviews();
    console.log("getAllReviews results: ", reviews);

    // const deletedProduct = await deleteProduct(8);
    // if (deletedProduct) {
    //   console.log("successfully deleted product with ID: ", 8);
    // } else {
    //   console.log("Deletion unsuccessful :(");
    // }

    await createInitialProductCategories();

    console.log("Done testing database...");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

rebuildDB().then(testDB);
