require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const helmet = require("helmet");
const nodemailer = require("nodemailer");

//import router
const recipeRouter = require("./routers/recipe");
const commentRouter = require("./routers/comment");
const authRouter = require("./routers/auth");

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
app.use(recipeRouter);
app.use(commentRouter);
app.use(authRouter);

// Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Email send
app.post("/send", async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    const info = await transporter.sendMail({
      from: "peworld08@gmail.com", // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: message, // plain text body
    });

    res.send(info);
  } catch (error) {
    res.send(error);
  }
});

// Email Login detected
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const info = await transporter.sendMail({
      from: "peworld08@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Login detected", // Subject line
      text: `Hai, kami telah mendeteksi akun anda telah login pada tanggal ${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()} pada jam ${new Date().getHours()}:${new Date().getMinutes()}`, // plain text body
    });

    auth.push(email);

    res.send(info);
  } catch (error) {
    res.send(error);
  }
});

// Email register detected
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const info = await transporter.sendMail({
      from: "peworld08@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Register detected", // Subject line
      text: `Hai, kami telah memverivikasi bahwa akun anda telah Register pada tanggal ${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()} pada jam ${new Date().getHours()}:${new Date().getMinutes()}`, // plain text body
    });

    auth.push(email);

    res.send(info);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on http//:localhost:${port}`);
});
