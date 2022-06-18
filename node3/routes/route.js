const router = require("express").Router();
const controller = require("../controller/controller");

router.get("/", controller.home);
router.get("/add", controller.add);
router.get("/addPost", controller.addPost);
router.post("/addPost", controller.addPostLogic);
router.get("/single/:id", controller.single);
router.get("/delete/:id", controller.delete);
router.get("/edit/:id", controller.edit);
router.post("/edit/:id", controller.edit);
// router.get("/show-all", controller.showAll);

module.exports = router;
