const postgres = require("postgres");

const sql = postgres({
  DB_HOST: "monorail.proxy.rlwy.net",
  DB_USER: "postgres",
  DB_PASS: "--dc1dg*b*c-EeE2Af1--gbCef3BCDe4",
  DB_NAME: "railway",
  DB_PORT: "51514",
});

module.exports = sql;
