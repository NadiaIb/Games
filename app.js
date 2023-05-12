const express = require("express");
const app = express();
const {
  getCategories,
  getEndpoints,
  getReviewId,
  getReviews
} = require("./controllers/games.controllers");

app.get("/api", getEndpoints)

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewId);

app.get("/api/reviews", getReviews)

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});
module.exports = app;