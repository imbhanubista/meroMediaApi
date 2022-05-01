const { createMedia } = require("../controllers/mediaController/createMedia.controller");
const {  listMedia, deleteMedia, updateMedia, editMedia } = require("../controllers/mediaController/media.controller");
const {
  createThumbnail,
  listThumbnail,
  deleteThumbnail,
  updateThumbnail,
  editThumbnail,
} = require("../controllers/mediaController/thumbnail");

const router = require("express").Router();

// create thumbnail
router.post("/createthumbnail", createThumbnail);

// get all thumbnail
router.get("/list_thumb", listThumbnail);

// to list media
router.get('/list_media', listMedia)

// edit thumbnail
router.post("/update_thumb/:id", updateThumbnail);

// update media
router.post('/update_media', updateMedia)

// to create media
router.post('/create_media', createMedia)


// delete thumbnail route
router.delete('/delete_thumb/:id', deleteThumbnail)

// delete media
router.delete('/delete_media/:id', deleteMedia)

// edit route
router.post('/edit_thumb/:id', editThumbnail)

// edit media
router.post ('/edit_media/:id', editMedia )

module.exports = router;
