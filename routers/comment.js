const router = require("express").Router();
const commentController = require("../controllers/comment")

//ENDPOINT COMMENT
//Add comment
router.post("/comment", commentController._addComment);
  
  //Get comment by recipe id
  router.get("/recipe/comment/:id", commentController._getCommentByRecipe);

module.exports = router;