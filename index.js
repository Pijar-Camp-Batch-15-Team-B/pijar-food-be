const express = require("express");
const app = express();
const port = 3000;
const database = require("./database");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// grant access for express can accept input from outside
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// cors
app.use(cors(corsOptions));

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

app.listen(port, () => {
  console.log(`Example app listening on port localhost:${port}`);
});
