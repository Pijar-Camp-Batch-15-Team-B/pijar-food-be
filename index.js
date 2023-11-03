require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const database = require("./database");
const cors = require("cors");
const helmet = require("helmet");

// grant access for express can accept input from outside
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// grant access for all client using this resource
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// using helmet
app.use(helmet());

// ENDPOINT RECIPE
// Get All recipe
app.get("/recipe", async (req, res) => {
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
app.get("/recipe/:id", async (req, res) => {
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
app.get("/newRecipe", async (req, res) => {
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
app.get("/latestRecipe", async (req, res) => {
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
app.post("/recipe", async (req, res) => {
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
    }
  } catch (error) {
    res.status(502).json({
      status: false,
      message: "Something Wrong on our server",
      data: [],
    });
  }
});

//ENDPOINT COMMENT
//Add comment
app.post("/comment", async (req, res) => {
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
    }
  } catch (error) {
    res.status(502).json({
      status: false,
      message: "Something Wrong on our server",
      data: [],
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on http//:localhost:${port}`);
});
