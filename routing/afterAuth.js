const { createMedia } = require("../controllers/mediaController/createMedia.controller");
const { editMedia, listMedia } = require("../controllers/mediaController/media.controller");
const {
  createThumbnail,
  listThumbnail,
  editThumbnail,
} = require("../controllers/mediaController/thumbnail");

const router = require("express").Router();

// create thumbnail
router.post("/createthumbnail", createThumbnail);

// get all thumbnail
router.get("/list_thumb", listThumbnail);

// edit thumbnail
router.post("/edit_thumb", editThumbnail);

// to create media
router.post('/create_media', createMedia)

// update media
router.post('/update_media', editMedia)

// to list media
router.get('/list_media', listMedia)

module.exports = router;
