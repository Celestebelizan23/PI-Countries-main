const { Router } = require("express");
const { Activity, Country } = require("../db");

const router = Router();

router.post("/", async (req, res) => {
  const { name, duration, difficulty, season, countries } = req.body;//le hacemos para obtener los valores del formulario 

  if (!name || !duration || !difficulty || !season) {
    return res.status(404).send("Missing data entry");//falta entrada de datos 
  }
  try {
    const activitiesCreated = await Activity.create({//uso await porque tengo que esperar a que el usuario termine de llenar el formulario
      name,
      difficulty,
      season,
      duration,
    });

    const todoCountry = await Country.findAll({
      where: { name: countries },
    });
    activitiesCreated.addCountry(todoCountry);

    return res.status(200).send(activitiesCreated);
  } catch (error) {
    console.log("error en post/activities",error);
  }
});

router.get('/', async (req, res) => {
  try {
     const allActivities = await Activity.findAll({
        include: Country
     })
     res.status(200).json(allActivities)
  } catch (error) {
     res.status(400).json({ error: "No activities found" })
  }

});

module.exports = router;