const express = require("express");
const app = express();
const router = express.Router();
const knex = require("../database");
const Knex = require("knex");

// api/reservations/	GET	Returns all reservations	GET api/reservations/

router.get("/", async (request, response) => {
  try {
    const titles = await knex("reservation").select();
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

//api/reservations/	POST	Adds a new reservation	POST api/reservations/

router.post("/", async function (req, res) {
  console.log(req.body);
  const newReservation = {
    name: req.body.name,
    phone_number:req.body.phone_number,
    email:req.body.email,
    number_of_guests: req.body.number_of_guests,
    meal_id: req.body.meal_id,
    created_date: req.body.created_date,
  };
  await knex("reservation").insert(newReservation);
  res.send("Thank you for your reservation. Reservation was added");
});

// api/reservations/{id}	GET	Returns reservation by id	GET api/reservations/2

router.get("/:id", async (req, res) => {
  try {
    const reservationById = await knex("reservation")
      .select()
      .where({ id: req.params.id });
    res.json(reservationById);
  } catch (error) {
    throw error;
  }
});

//api/reservations/{id}	PUT	Updates the reservation by id	PUT api/reservations/2

router.put("/:id", async (req, res) => {
  console.log(`params.id=${req.params.id}`);
  const reservationById = await knex("reservation")
    .where({ id: req.params.id })
    .update({ number_of_guests: req.query.number_of_guests });
  res.send("The number of guests in reservation was changed");
});

// api/reservations/{id}	DELETE	Deletes the reservation by id	DELETE api/reservations/2

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await knex("reservation").where({ id }).delete();
    res.send(`Reservatiom with id: ${id} was deleted`);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
