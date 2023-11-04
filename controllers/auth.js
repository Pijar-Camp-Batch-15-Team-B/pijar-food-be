const authModel = require("../models/auth");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Validator } = require("node-input-validator");

const authController = {
  _checkJwt: async (req, res, next) => {
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
  },
  _getAllUser: async (req, res) => {
    try {
      const request = await authModel.getAllUser();

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
  },
  _inputValidation: async (req, res, next) => {
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
  _inputValidationLogin: async (req, res, next) => {
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
  _regist: async (req, res) => {
    try {
      const { username, email, phone_number, password } = req.body;

      // check unique email
      const checkEmail = await authModel.checkEmail(email);

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

      const request = await authModel.regist({
        username,
        email,
        phone_number,
        hash,
      });

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
  },
  _login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // check if email registered
      const checkEmail = await authModel.checkEmail(email);

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
  },
  _getDetailUser: async (req, res) => {
    try {
      const token = req.headers.authorization.slice(7);
      const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN);

      const request = await authModel.getDetailUser(decoded);

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
  },
};

module.exports = authController;
