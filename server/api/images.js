const express = require("express");
const imagesRouter = express.Router();
const {
  getAllImages,
  createImage,
  getImageById,
  updateImage,
  deleteImage,
} = require("../db");

imagesRouter.use((req, res, next) => {
  console.log("A request is being made to /images");

  next();
});

imagesRouter.get("/", async (req, res) => {
  const images = await getAllImages();

  res.send({ images });
});

imagesRouter.patch("/:imageId", async (req, res, next) => {
  const { imageId } = req.params;
  const { title, img_src } = req.body;
  const updateFields = {};

  if (title) {
    updateFields.title = title;
  }

  if (img_src) {
    updateFields.img_src = img_src;
  }

  try {
    const originalImage = await getImageById(imageId);

    if (originalImage) {
      const updatedImage = await updateImage(imageId, updateFields);
      res.send({ image: updatedImage });
    } else {
      next({
        name: "UpdateImageError",
        message: "Error updating image",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

imagesRouter.post("/", async (req, res, next) => {
  const { title, img_src } = req.body;

  const imageData = { title, img_src };

  try {
    const image = await createImage(imageData);

    if (image) {
      res.send({ image });
    } else {
      next({
        name: "CreateImageError",
        message: "Error creating image",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

imagesRouter.delete("/:imageId", async (req, res, next) => {
  try {
    const image = await deleteImage(req.params.imageId);

    if (image) {
      res.send({ image });
    } else {
      next({
        name: "DeleteImageError",
        message: "Error deleting image",
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

module.exports = imagesRouter;
