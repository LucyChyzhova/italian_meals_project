const express = require("express");
const app = express();
const router = express.Router();
const knex = require("../database");

//api/reviews/	GET	Returns all reviews	GET api/reviews/

router.get("/", async (request, response) => {
  try {
    const titles = await knex("review").select();
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

// api/reviews/	POST	Adds a new review	POST api/reviews/

router.post("/", async function (req, res) {
  console.log(req.body);
  const newReview = {
    title: req.query.title,
    description: req.query.description,
    meal_id: req.query.meal_id,
    stars: req.query.stars,
    created_date: req.query.created_date,
  };
  await knex("review").insert(newReview);
  res.send("new review was added");
});

// api/reviews/{id}	GET	Returns review by id	GET api/reviews/2

router.get("/:id", async (req, res) => {
  try {
    const reviewById = await knex("review")
      .select()
      .where({ id: req.params.id });
    res.json(reviewById);
  } catch (error) {
    throw error;
  }
});

// api/reviews/{id}	PUT	Updates the review by id	PUT api/reviews/2

router.put("/:id", async (req, res) => {
  console.log(`params.id=${req.params.id}`);
  const reviewById = await knex("review")
    .where({ id: req.params.id })
    .update({ stars: req.query.stars });
  res.send("column 'stars' in review was changed");
});

// api/reviews/{id}	DELETE	Deletes the review by id	DELETE api/reviews/2

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await knex("review").where({ id }).delete();
    res.send(`Rreview with id: ${id} was deleted`);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
