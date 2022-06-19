const postController = require("../controllers/postController")
const router = require("express").Router()
router.post("/add",postController.addPost)
router.get("/all",postController.getAll)
router.get("/all/:id",postController.getSingle)
router.patch("/edit/:id",postController.edit)
router.delete("/delete/:id",postController.delete)



module.exports = router