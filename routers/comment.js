const router = require("express").Router();
const database = require("../database");

//ENDPOINT COMMENT
//Add comment
router.post("/comment", async (req, res) => {
    try {
      const { recipe_id, username, photo_profile, message } = req.body;
  
      const request =
        await database`INSERT INTO comment (recipe_id, username, photo_profile, message)
        values
        (${recipe_id}, ${username}, ${photo_profile}, ${message}) RETURNING id`;
  
      if (request.length > 0) {
        res.status(201).json({
          status: true,
          message: "Insert Data Success",
        });
  
        return;
      }
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something Wrong on our server",
        data: [],
      });
    }
  });
  
  //Get comment by recipe id
  router.get("/recipe/comment/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const request =
        await database`SELECT * FROM comment WHERE recipe_id = ${id}`;
  
      res.status(200).json({
        status: true,
        message: "Get data success",
        data: request,
      });
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something wrong in our server",
        data: [],
      });
    }
  });

module.exports = router;