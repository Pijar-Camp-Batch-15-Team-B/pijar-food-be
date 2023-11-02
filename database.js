const postgres = require("postgres");

const sql = postgres({
  host: "monorail.proxy.rlwy.net",
  user: "postgres",
  pass: "--dc1dg*b*c-EeE2Af1--gbCef3BCDe4",
  database: "railway",
  port: "51514",
});

module.exports = sql;
