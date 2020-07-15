const express = require("express");
const app = express();
const router = express.Router();
const knex = require("../database");


//api/meal/	POST	Adds a new meal	POST api/meals/
router.post("/", async function (req, res) {
  console.log(req.body);
  const newMeal = {
    title: req.query.title,
    description: req.query.description,
    location: req.query.location,
    when: req.query.when,
    max_reservation: req.query.max_reservation,
    price: req.query.price,
    created_date: req.query.created_date,
  };
  await knex("meal").insert(newMeal);
  res.send("the meal was added");
});

//api/meals/{id}	GET	Returns meal by id	GET api/meals/2

router.get("/:id", async (req, res) => {
  try {
    const mealById = await knex("meal").select().where({ id: req.params.id });
    res.json(mealById);
  } catch (error) {
    throw error;
  }
});

//api/meals/{id}	PUT	Updates the meal by id	PUT api/meals/2

router.put("/:id", async (req, res) => {
  console.log(`params.id=${req.params.id}`);
  const mealById = await knex("meal")
    .where({ id: req.params.id })
    .update({ max_reservation: req.query.max_reservation });
  res.send(`Amount of meal's reservation (id: ${req.params.id}) was changed`);
});


//api/meals/{id}	DELETE	Deletes the meal by id	DELETE meals/2

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await knex("meal").where({ id }).delete();
    res.send(`Meal was deleted by id: ${id}`);
  } catch (error) {
    res.send(error);
  }
});

//GET api/meals/ query parameters

router.get("/", async (req, res) => {
  try {
    let result;
    let maxPrice = req.query.maxPrice;
    let maxPriceParse = parseInt(maxPrice);
    const availableReservations = req.query.availableReservations;
    let someTitle = req.query.title;
    let createdAfter = req.query.createdAfter;
    let limit = req.query.limit;

    if (maxPrice) {
      // api/meals?maxPrice=90
      result = await knex("meal").where("price", "<", maxPriceParse).select();
      
    } else if (availableReservations) {
      //api/meals?availableReservations=true
      result = await knex
        .from("meal")        
        .leftJoin("reservation", { "meal.id": "reservation.meal_id" })
        .groupBy("meal.id")        
        .having(knex.raw('meal.max_reservation > coalesce(sum(reservation.number_of_guests), 0)'))
        .select("meal.*");

    } else if (someTitle) {
      //api/meals?title=lasa
      result = await knex("meal")
        .where("title", "like", `%${someTitle}%`)
        .select();
    } else if (createdAfter) {
      // api/meals?createdAfter=2019-04-05
      result = await knex("meal")
        .where("created_date", ">", createdAfter)
        .select();
    } else if (limit) {
      //api/meals?limit=4
      let limitParse = parseInt(limit);
      result = await knex("meal").limit(limitParse).select();
    } else {
      // api/meals/	GET	Returns all meals	GET api/meals
      result = await knex("meal").select();
    }

    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

