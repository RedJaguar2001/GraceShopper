const { 
    client,
    getAllProducts,
    getAllUsers,
    createProduct,
    createUser,
    updateProduct,
    updateUser,
} = require('./index');

async function dropTables() {
    try {

        console.log('Starting to drop tables...');

        await client.query(`
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS users;
            `);

        console.log('Done dropping tables...');

    } catch(error) {
        console.error(error);
        throw error;
    }
}

async function createTables() {
    try {

        console.log('Starting to build tables...');

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
            `)

        console.log('Done building tables...');

    } catch(error) {
        console.error(error);
        throw error;
    }
}

async function createInitialUsers() {
    try {
        await createUser({name: 'Kevin H', username: 'khassenkamp', password: 'kevin123', email: 'kevinH@redjags.com'});
        await createUser({name: 'Brian B', username: 'brian', password: 'brian', email: 'brian'});
        await createUser({name: 'Jasmine H', username: 'jasmine', password: 'jasmine', email: 'jasmine'});
        await createUser({name: 'Patrick H', username: 'patrick', password: 'patrick', email: 'patrick'});
    } catch(error) {
        console.error(error);
        throw error;
    }
}

async function createInitialProduct() {
    try {

        // console.log('Starting to create initial product...');

        await createProduct({title: 'American Cheese', description: 'Goes great with burgers!', price: '2.99', inventory: '10'});

        // console.log('Done creating initial product');
    } catch(error) {
        console.error(error);
        throw error;
    }
}

async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialProduct();
        await createInitialUsers();
    } catch(error) {
        console.error(error);
        throw error;
    }
}

async function testDB() {
    try {

        console.log('Starting to test database...');

        console.log('Calling getAllProducts...')
        const products = await getAllProducts();
        console.log('getAllProducts result:', products);

        console.log('Calling updateProducts...');
        const updatedProduct = await updateProduct(products[0].id, {
            title: 'Cheddar Cheese',
            description: 'Yummy in my tummy',
            price: '4.99',
            inventory: '5'
        });
        console.log('updateProduct result:', updatedProduct);

        const users = await getAllUsers();
        console.log('getAllUsers result:', users);

        console.log('Done testing database...');

    } catch(error) {
        console.error(error);
        throw error;
    }
}

rebuildDB()
    .then(testDB);