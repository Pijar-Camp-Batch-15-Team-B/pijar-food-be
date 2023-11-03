require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const database = require("./database");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Validator } = require("node-input-validator");

//import router
const recipeRouter = require('./routers/recipe')
const commentRouter = require('./routers/comment')

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

// Middleware Function
const checkJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7);
    const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN);

    if (decoded) {
      next();
    } else {
      res.status(401).json({
        status: false,
        message: "Token error",
        data: [],
      });
    }
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Token error",
      data: [],
    });
  }
};


// ENDPOINT AUTH
// Get all users
app.get("/users", async (req, res) => {
  try {
    const request =
      await database`SELECT username, phone_number, email, photo_profile FROM users`;

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

// Register
app.post(
  "/users/register",
  async (req, res, next) => {
    const schema = new Validator(req.body, {
      username: "required|minLength:1|maxLength:100",
      email: "required|email",
      phone_number: "required|phoneNumber",
      password: "required|minLength:5",
    });

    schema.check().then((matched) => {
      if (!matched) {
        res.status(422).json({
          status: false,
          message: schema.errors,
          data: null,
        });
      } else {
        next();
      }
    });
  },
  async (req, res) => {
    try {
      const { username, email, phone_number, password } = req.body;

      // check unique email
      const checkEmail =
        await database`SELECT * FROM users WHERE email = ${email}`;

      if (checkEmail.length > 0) {
        res.status(400).json({
          status: false,
          message: "email already registered",
        });

        return;
      }

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);

      const request =
        await database`INSERT INTO users (username, email, phone_number, password)
      values
      (${username}, ${email}, ${phone_number}, ${hash}) RETURNING id`;

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
  }
);

// Login
app.post(
  "/users/login",
  async (req, res, next) => {
    const schema = new Validator(req.body, {
      email: "required|email",
      password: "required|minLength:5",
    });

    schema.check().then((matched) => {
      if (!matched) {
        res.status(422).json({
          status: false,
          message: schema.errors,
          data: null,
        });
      } else {
        next();
      }
    });
  },
  async (req, res) => {
    try {
      const { email, password } = req.body;

      // check if email registered
      const checkEmail =
        await database`SELECT * FROM users WHERE email = ${email}`;

      if (checkEmail.length == 0) {
        res.status(400).json({
          status: false,
          message: "email not registered",
        });

        return;
      }

      // check if password correct
      const isMatch = bcrypt.compareSync(password, checkEmail[0].password);

      if (isMatch) {
        const token = jwt.sign(checkEmail[0], process.env.APP_SECRET_TOKEN);

        res.status(200).json({
          status: true,
          message: "Login success",
          accessToken: token,
          data: checkEmail,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "password incorrect",
        });
      }
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something wrong in our server",
        data: [],
      });
    }
  }
);

// Get detail user
app.get("/users/me", checkJwt, async (req, res) => {
  try {
    const token = req.headers.authorization.slice(7);
    const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN);

    const request =
      await database`SELECT * FROM users WHERE id = ${decoded.id}`;

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
  console.log(`Example app listening on http//:localhost:${port}`);
});
