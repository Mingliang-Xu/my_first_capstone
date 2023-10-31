const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(`${__dirname}/public`));

const capstonedb = require("./database");
const seed = require("./seed");

const {
  addAppt,
  getAppt,
  deleteAppt,
  addReview,
  getReview,
  deleteReview,
} = require("./controller");

app.post("/api/seed", seed);

app.post("/api/addReview", addReview);
app.get("/api/getReview", getReview);
app.delete("/api/deleteReview/:id", deleteReview);

app.post("/api/addAppt", addAppt);
app.get("/api/getAppt", getAppt);
app.delete("/api/deleteAppt/:id", deleteAppt);

capstonedb.sync();

app.listen(5000, () => {
  console.log("Running on 5000 ⏳");
});
