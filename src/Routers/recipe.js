const router = require("express").Router();
const recipeController = require("../Controllers/recipe");

// ENDPOINT RECIPE
// Get All recipe
router.get("/recipe", recipeController._getAllRecipe);

// Get detail recipe
router.get("/recipe/:id", recipeController._getDetailRecipe);

// Get New Recipe
router.get("/newRecipe", recipeController._getNewRecipe);

// Get latest recipe
router.get("/latestRecipe", recipeController._getLatestRecipe);

//Add recipe
router.post(
  "/recipe",
  recipeController._inputValidaion,
  recipeController._addRecipe
);

module.exports = router;
