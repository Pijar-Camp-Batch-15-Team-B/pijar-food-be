const commentModel = require("../Models/comment");

const { Validator } = require("node-input-validator");

const commentController = {
  _inputValidaion: async (req, res, next) => {
    const schema = new Validator(req.body, {
      recipe_id: "required|minLength:1",
      username: "required|minLength:1",
      photo_profile: "required|minLength:1",
      message: "required|minLength:5",
    });

    schema.check().then((matched) => {
      if (!matched) {
        res.status(422).send({
          status: false,
          message: schema.errors,
          data: null,
        });
      } else {
        next();
      }
    });
  },
  _addComment: async (req, res) => {
    try {
      const { recipe_id, username, photo_profile, message } = req.body;

      const request = await commentModel.addComment({
        recipe_id,
        username,
        photo_profile,
        message,
      });

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
  },
  _getCommentByRecipe: async (req, res) => {
    try {
      const { id } = req.params;
      const request = await commentModel.getCommentByRecipe(id);

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

module.exports = commentController;
