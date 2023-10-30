const capstonedb = require("./database");

const seed = () => {
  capstonedb
    .query(
      `CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(30),
        last_name VARCHAR(30),
        date DATE,
        description VARCHAR(500)
        );
      CREATE TABLE appointments(
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(30),
      last_name VARCHAR(30),
      date DATE,
      number_of_people INT);
      `
    )
    .then(() => {
      console.log("Seed:");
    });
};

module.exports = seed;
