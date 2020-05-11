const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

router.get("/", (req, res) => {
  const queryText = `SELECT "user".id, "user".first_name, "user".last_name, "user".email, "user".zip_code, "user".introduction, "user_price_range".min_price as "user_min_price", "user_price_range".max_price as "user_max_price", "user_radius".radius_id as "user_radius_id", array_agg("user_specialty".specialty_id) as "user_specialty_id" FROM "user"
  JOIN "user_price_range" ON "user".id="user_price_range".user_id
  JOIN "user_radius" ON "user".id="user_radius".user_id
  JOIN "user_specialty" ON "user".id="user_specialty".user_id
  WHERE "user".type_id=2
  GROUP BY "user".id, "user_price_range".min_price, "user_price_range".max_price, "user_radius".radius_id
  ;`;
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

router.get("/details/:id", (req, res) => {
  const repairmanId = req.params.id;
  const queryText = `SELECT "user".id, "user".first_name, "user".last_name, "user".email, "user".zip_code, "user".introduction, "user_price_range".min_price as "user_min_price", "user_price_range".max_price as "user_max_price", "user_radius".radius_id as "user_radius_id", array_agg("user_specialty".specialty_id) as "user_specialty_id" FROM "user"
  JOIN "user_price_range" ON "user".id="user_price_range".user_id
  JOIN "user_radius" ON "user".id="user_radius".user_id
  JOIN "user_specialty" ON "user".id="user_specialty".user_id
  WHERE "user".id = $1
  GROUP BY "user".id, "user_price_range".min_price, "user_price_range".max_price, "user_radius".radius_id
  ;`;
  pool
    .query(queryText, [repairmanId])
    .then((responseDb) => {
      res.send(responseDb.rows);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

module.exports = router;
