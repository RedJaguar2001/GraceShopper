const { client } = require('./client');
const { getProductById } = require('./products');

async function createImage({title, img_src}) {
    try {
        const {rows:[image]} = await client.query(`
            INSERT INTO images (title, img_src)
            VALUES ($1, $2)
            ON CONFLICT (title) DO NOTHING
            RETURNING *;
            `, [title, img_src]);

        return image;
    } catch(error) {
        console.error(error);
        throw error;
    }
};

async function getAllImages() {
    const { rows } = await client.query(`
        SELECT *
        FROM images;
        `);

    return rows;
};

async function getImageById(imageId) {
    try {
        const { rows: [image] } = await client.query(`
            SELECT *
            FROM images
            WHERE id=$1;
            `, [imageId]);

            if(!image) {
                throw {
                    name: 'ImageNotFoundError',
                    description: `Could not find an image with the id of ${imageId}`,
                }
            }

        return image;
    } catch(error) {
        console.error(error);
        throw error;
    }
};

async function updateImage(id, fields = {}) {
    const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");

    if(setString.length === 0) {
        return;
    }

    try {
        const {rows: [image] } = await client.query(`
            UPDATE images
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
            `, Object.values(fields));

        return image;
    } catch(error) {
        console.error(error);
        throw error;
    }
};

async function deleteImage(imageId) {
    try {
        await client.query(`
            DELETE FROM images
            WHERE id=$1;
            `, [productId]);

        return `DELETED IMAGE NUMBER: ${imageId}`;
    } catch(error) {
        console.error(error);
        throw error;
    }
};

async function createProductImage(productId, imageId) {
    try {
        await client.query(`
            INSERT INTO products_images("productId", "imageId")
            VALUES ($1, $2)
            ON CONFLICT ("productId", "imageId") DO NOTHING;
            `, [productId, imageId]);
    } catch(error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    createImage,
    getAllImages,
    getImageById,
    updateImage,
    deleteImage,
    createProductImage,
}
