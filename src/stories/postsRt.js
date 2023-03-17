const postsCt = require("./postsCt");
const isAuth = require("../middlewares/session");
const router = require("express").Router();
const validator = require("../validators/posts");


router.get("/", isAuth, postsCt.listAllPost);
router.post("/", isAuth, validator.createPost, postsCt.createNewPost);
router.get("/find/:query", isAuth, postsCt.findByTitle);

module.exports = router;