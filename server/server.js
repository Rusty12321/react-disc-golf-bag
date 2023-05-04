const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const dotenv = require("dotenv");
dotenv.config();

const pg = require("pg");
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.connect();

app.use(express.json());

app.get("/api/discs", (req, res) => {
  pool.query("SELECT * FROM disc").then((result) => {
    res.send(result.rows);
  });
});

app.get("/api/discs/:discID", (req, res) => {
  pool
    .query("SELECT * FROM disc WHERE id = $1", [req.params.discID])
    .then((result) => {
      if (result.rows.length == 0) {
        res.status(404).send("Disc Not Found");
      } else {
        res.send(result.rows);
      }
    });
});

app.get("/api/bag", (req, res) => {
  pool
    .query("SELECT * FROM disc WHERE bag_or_storage = $1", ["bag"])
    .then((result) => {
      if (result.rows.length == 0) {
        res.status(404).send("No Discs in Bag");
      } else {
        res.send(result.rows);
      }
    });
});

app.get("/api/storage", (req, res) => {
  pool
    .query("SELECT * FROM disc WHERE bag_or_storage = $1", ["storage"])
    .then((result) => {
      if (result.rows.length == 0) {
        res.status(404).send("No Discs in Storage");
      } else {
        res.send(result.rows);
      }
    });
});

app.post("/api/discs", (req, res) => {
  let {
    name,
    type_of_plastic,
    type_of_disc,
    weight_in_grams,
    color,
    speed,
    glide,
    turn,
    fade,
    bag_or_storage,
    company_name,
  } = req.body;
  pool
    .query(
      "INSERT INTO disc (name, type_of_plastic, type_of_disc, weight_in_grams, color, speed, glide, turn, fade, bag_or_storage, company_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        name,
        type_of_plastic,
        type_of_disc,
        weight_in_grams,
        color,
        speed,
        glide,
        turn,
        fade,
        bag_or_storage,
        company_name,
      ]
    )
    .then((result) => {
      res.status(201).send(result.rows);
    });
});

app.patch("/api/discs/:discID", (req, res) => {
  let {
    name,
    type_of_plastic,
    type_of_disc,
    weight_in_grams,
    color,
    speed,
    glide,
    turn,
    fade,
    bag_or_storage,
    company_name,
  } = req.body;
  pool
    .query(
      "UPDATE disc SET name = COALESCE($1, name), type_of_plastic = COALESCE($2, type_of_plastic), type_of_disc = COALESCE($3, type_of_disc), \
    weight_in_grams = COALESCE($4, weight_in_grams), color = COALESCE($5, color), speed = COALESCE($6, speed), glide = COALESCE($7, glide), turn = COALESCE($8, turn), \
    fade = COALESCE($9, fade), bag_or_storage = COALESCE($10, bag_or_storage), company_name = COALESCE($11, company_name) WHERE id = $12 RETURNING *",
      [
        name || null,
        type_of_plastic || null,
        type_of_disc || null,
        weight_in_grams || null,
        color || null,
        speed || null,
        glide || null,
        turn || null,
        fade || null,
        bag_or_storage || null,
        company_name || null,
        req.params.discID,
      ]
    )
    .then((result) => {
      if (result.rows.length == 0) {
        res.status(404).send("Disc Not Found");
      } else {
        res.send(result.rows);
      }
    });
});

app.delete("/api/discs/:discID", (req, res) => {
  pool
    .query("DELETE FROM disc WHERE id = $1 RETURNING *", [req.params.discID])
    .then((result) => {
      if (result.rows.length == 0) {
        res.status(404).send("Disc Not Found");
      } else {
        res.send(result.rows);
      }
    });
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
