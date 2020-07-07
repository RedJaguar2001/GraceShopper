const { client } = require('./client');

//getReviewByUserId
//getReviewByProductId

//createReview
async function createReview({title, body, rating, userId, productId}) {
    if (!title || !rating || !userId || !productId) {
        return null;
    }

    const {rows: [review]} = await client.query(`
        INSERT INTO reviews(title, rating, user_id, product_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `, [title, body || null, rating, userId, productId]);

    return review;
}

//updateReview
async function updateReview(id, fields = {}) {
    if (!id) {
        return null;
    }

    const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");

    if (!setString.length) {
        return null;
    }
    
    const {rows: [updatedReview]} = await client.query(`
        UPDATE reviews
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
    `, Object.values(fields));

    return updatedReview;
}

//deleteReview needed? Are we going to allow deleting them?

module.exports = {
    createReview,
    updateReview
}