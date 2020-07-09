const { client } = require("./client");

async function getReviewById(reviewId) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
            SELECT *
            FROM reviews
            WHERE id=$1;
        `,
      [reviewId]
    );

    if (!review) {
      throw {
        name: "ReviewByIdNotFoundError",
        description: `Couldn't find review with Id: ${reviewId}`,
      };
    }

    return review;
  } catch (error) {
    throw error;
  }
}

//getReviewsByUserId - Don't think this works? need to get multiple reviews.
async function getReviewsByUserId(userId) {
  try {
    const {
      rows: [reviews],
    } = await client.query(
      `
            SELECT *
            FROM reviews
            WHERE user_id=$1;
        `,
      [userId]
    );

    if (!reviews) {
      throw {
        name: "ReviewByUserIdNotFoundError",
        description: `Couldn't find review with userId: ${userId}`,
      };
    }

    return reviews;
  } catch (error) {
    throw error;
  }
}

//getReviewsByProductId

//createReview
async function createReview({ title, body, rating, userId, productId }) {
  if (!title || !rating || !userId || !productId) {
    return null;
  }

  const {
    rows: [review],
  } = await client.query(
    `
        INSERT INTO reviews(title, rating, user_id, product_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `,
    [title, body || null, rating, userId, productId]
  );

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

  const {
    rows: [updatedReview],
  } = await client.query(
    `
        UPDATE reviews
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
    `,
    Object.values(fields)
  );

  return updatedReview;
}

//deleteReview needed? Are we going to allow deleting them?

module.exports = {
  getReviewById,
  getReviewsByUserId,
  createReview,
  updateReview,
};
