const capstonedb = require("./database");

module.exports = {
  addReview: (req, res) => {
    const { first_name, last_name, date, description } = req.body;
    console.log(req.body);
    capstonedb
      .query(
        `
    INSERT INTO reviews(first_name, last_name, date, description)
    VALUES('${first_name}', '${last_name}', '${date}','${description}')
    RETURNING *;
    `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      });
  },

  getReview: (req, res) => {
    capstonedb
      .query(
        `SELECT * FROM reviews
         ORDER BY DATE DESC;`
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      });
  },
  deleteReview: (req, res) => {
    const { id } = req.params;

    capstonedb
      .query(
        `
    DELETE FROM reviews
    WHERE id = ${id};
    SELECT * FROM reviews
    ORDER BY DATE DESC;`
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      });
  },
  addAppt: (req, res) => {
    console.log(req.body);
    const { first_name, last_name, date, number_of_people } = req.body;
    capstonedb
      .query(
        `
    INSERT INTO appointments(first_name, last_name, date, number_of_people)
    VALUES('${first_name}','${last_name}','${date}','${number_of_people}')
    RETURNING *;
        `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      });
  },
  getAppt: (req, res) => {
    capstonedb
      .query(
        `
    SELECT * FROM appointments
    ORDER BY DATE DESC;
    `
      )
      .then((dbRes) => {
        console.log(dbRes[0]);

        res.status(200).send(dbRes[0]);
      });
  },

  deleteAppt: (req, res) => {
    const { id } = req.params;

    capstonedb
      .query(
        `
    DELETE FROM appointments
    WHERE id = ${id};
    SELECT * FROM appointments
    ORDER BY DATE DESC; `
      )
      .then((dbRes) => {
        console.log(dbRes[0]);
        res.status(200).send(dbRes[0]);
      });
  },
};
