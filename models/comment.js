const database = require("../database");

const modelComment = {
  addComment: async (payload) => {
    const { recipe_id, username, photo_profile, message } = payload;

    const request =
      await database`INSERT INTO comment (recipe_id, username, photo_profile, message)
            values
            (${recipe_id}, ${username}, ${photo_profile}, ${message}) RETURNING id`;

    return request;
  },
  getCommentByRecipe: async (id) => {
    const request =
      await database`SELECT * FROM comment WHERE recipe_id = ${id}`;

    return request;
  },
};

module.exports = modelComment;
