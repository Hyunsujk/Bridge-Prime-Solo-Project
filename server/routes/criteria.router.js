const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

router.get("/radius", (req, res) => {
  const queryText = `SELECT * FROM "radius";`;
  pool
    .query(queryText)
    .then((responseDb) => {
      res.send(responseDb.rows);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

router.get("/specialty", (req, res) => {
  const queryText = `SELECT * FROM "specialty";`;
  pool
    .query(queryText)
    .then((responseDb) => {
      res.send(responseDb.rows);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

module.exports = router;
