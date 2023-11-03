const router = require("express").Router();
const database = require("../database");

// ENDPOINT RECIPE
// Get All recipe
router.get("/recipe", async (req, res) => {
    try {
      const request = await database`SELECT * FROM recipe`;
  
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
  
  // Get detail recipe
  router.get("/recipe/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const request = await database`SELECT * FROM recipe WHERE id = ${id}`;
  
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
  
  // Get New Recipe
  router.get("/newRecipe", async (req, res) => {
    try {
      const request =
        await database`SELECT * FROM recipe ORDER BY id DESC LIMIT 1`;
  
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
  
  // Get latest recipe
  router.get("/latestRecipe", async (req, res) => {
    try {
      const newRecipe =
        await database`SELECT * FROM recipe ORDER BY id DESC LIMIT 1`;
      const newRecipeId = newRecipe[0].id;
  
      const request =
        await database`SELECT * FROM recipe WHERE id < ${newRecipeId} ORDER BY id DESC`;
  
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
  
  //Add recipe
  router.post("/recipe", async (req, res) => {
    try {
      const { title, ingridients, image, video_url } = req.body;
  
      const request =
        await database`INSERT INTO recipe (title, ingridients, image, video_url)
        values
        (${title}, ${ingridients}, ${image}, ${video_url}) RETURNING id`;
  
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

module.exports = router;