const database = require("../database");

const modelRecipe = {
  getAllRecipe: async () => {
    const request = await database`SELECT * FROM recipe`;

    return request;
  },
  getDetailRecipe: async (id) => {
    const request = await database`SELECT * FROM recipe WHERE id = ${id}`;

    return request;
  },
  getNewRecipe: async () => {
    const request =
      await database`SELECT * FROM recipe ORDER BY id DESC LIMIT 1`;

    return request;
  },
  getLatestRecipe: async () => {
    const newRecipe =
      await database`SELECT * FROM recipe ORDER BY id DESC LIMIT 1`;
    const newRecipeId = newRecipe[0].id;

    const request =
      await database`SELECT * FROM recipe WHERE id < ${newRecipeId} ORDER BY id DESC`;
    return request;
  },
  addRecipe: async (payload) => {
    const { title, ingridients, image, video_url } = payload;
    const request =
      await database`INSERT INTO recipe (title, ingridients, image, video_url)
        values
        (${title}, ${ingridients}, ${image}, ${video_url}) RETURNING id`;

    return request;
  },
};

module.exports = modelRecipe;
