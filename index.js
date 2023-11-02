const express = require("express");
const app = express();
const port = 3000;
const database = require("./database");

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

app.listen(port, () => {
  console.log(`Example app listening on port localhost:${port}`);
});
