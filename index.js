require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const helmet = require("helmet");

//import router
const recipeRouter = require('./routers/recipe')
const commentRouter = require('./routers/comment')
const authRouter = require('./routers/auth')

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
app.use(recipeRouter)
app.use(commentRouter)
app.use(authRouter)


app.listen(port, () => {
  console.log(`Example app listening on http//:localhost:${port}`);
});
