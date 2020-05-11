const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.get("/details", (req, res) => {
  userId = req.user.id;
  userType = req.user.type_id;
  if (userType === 2) {
    queryText = `SELECT "user".id, "user_price_range".min_price as "user_min_price", "user_price_range".max_price as "user_max_price", "user_radius".radius_id as "user_radius_id", array_agg("user_specialty".specialty_id) as "user_specialty_id" FROM "user"
        JOIN "user_price_range" ON "user".id="user_price_range".user_id
        JOIN "user_radius" ON "user".id="user_radius".user_id
        JOIN "user_specialty" ON "user".id="user_specialty".user_id
        WHERE "user".id =$1
        GROUP BY "user".id, "user_price_range".min_price, "user_price_range".max_price, "user_radius".radius_id
        ;
        `;
    pool
      .query(queryText, [userId])
      .then((responseDb) => {
        res.send(responseDb.rows);
        console.log(responseDb.rows);
      })
      .catch((err) => {
        console.warn(err);
        res.sendStatus(500);
      });
  }
});

router.post("/register/homeowner", (req, res, next) => {
  const user = req.body;
  const password = encryptLib.encryptPassword(req.body.login.password);

  const queryText =
    'INSERT INTO "user" (username, password, first_name, last_name, email, address_line1, address_line2, city, state, zip_code, type_id) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id';
  pool
    .query(queryText, [
      user.login.username,
      password,
      user.first_name,
      user.last_name,
      user.email,
      user.address_line1,
      user.address_line2,
      user.city,
      user.state,
      user.zip_code,
      user.type_id,
    ])
    .then((response) => {
      console.log(response.rows[0].id);
      res.sendStatus(201);
    })
    .catch(() => res.sendStatus(500));
});

router.post("/register/repairman", (req, res, next) => {
  const user = req.body;
  const password = encryptLib.encryptPassword(req.body.login.password);

  const queryText =
    'INSERT INTO "user" (username, password, first_name, last_name, email, zip_code,introduction,type_id) VALUES ($1, $2,$3,$4,$5,$6,$7,$8) RETURNING id';
  pool
    .query(queryText, [
      user.login.username,
      password,
      user.first_name,
      user.last_name,
      user.email,
      user.zip_code,
      user.introduction,
      user.type_id,
    ])
    .then((response) => {
      const userId = response.rows[0].id;
      pool
        .query(`INSERT INTO "user_radius" (user_id, radius_id) VALUES($1,$2)`, [
          userId,
          user.radius_id,
        ])
        .then(() => {
          pool
            .query(
              `INSERT INTO "user_price_range" (user_id, min_price, max_price) VALUES($1,$2,$3)`,
              [userId, user.min_price, user.max_price]
            )
            .then(() => {
              let queryText = `INSERT INTO "user_specialty" (user_id, specialty_id) VALUES`;
              const dynamicQueryValues = [userId];
              console.log(user.specialty_id);
              for (let index = 0; index < user.specialty_id.length; index++) {
                const item = user.specialty_id[index];
                if (dynamicQueryValues.length > 1) {
                  queryText = `${queryText},`;
                }
                queryText = `${queryText} ($1, $${index + 2})`;
                dynamicQueryValues.push(item);
              }
              pool
                .query(queryText, dynamicQueryValues)
                .then(() => res.sendStatus(201))
                .catch((err) => {
                  console.log("Error saving user_specialty", err);
                  res.sendStatus(500);
                });
            })
            .catch((err) => {
              console.log("Error saving user_price_range", err);
              res.sendStatus(500);
            });
        })
        .catch((err) => {
          console.log("Error saving user_radius", err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log("Error posting new user", err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
