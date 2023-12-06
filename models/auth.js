const database = require("../database");

const modelAuth = {
  getAllUser: async () => {
    const request =
      await database`SELECT username, phone_number, email, photo_profile FROM users`;

    return request;
  },
  checkEmail: async (email) => {
    const request = database`SELECT * FROM users WHERE email = ${email}`;

    return request;
  },
  regist: async (payload) => {
    const { username, email, phone_number, hash } = payload;

    const request =
      await database`INSERT INTO users (username, email, phone_number, password)
        values
        (${username}, ${email}, ${phone_number}, ${hash}) RETURNING id`;

    return request;
  },
  getDetailUser: async (decoded) => {
    const request =
      await database`SELECT * FROM users WHERE id = ${decoded.id}`;

    return request;
  },
  editProfile: async (reqBody, columns, id) => {
    const request = await database`
    UPDATE users SET ${database(
      reqBody,
      columns
    )} WHERE id = ${id} RETURNING id`;

    return request;
  },
};

module.exports = modelAuth;
