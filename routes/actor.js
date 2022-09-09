
const express = require('express');

const router = express.Router();


const actorController = require('../controllers/ActorController')
        


router.get("/actor",actorController.getAllActor);
router.post("/actor",actorController.createActor);
router.put("/actor/:id_actor",actorController.upadateActor);
router.delete("/actor/:id_actr",actorController.deleteActorById);
router.get("/actor/:id_Act",actorController.findActorById);


router.param('id_actor', actorController.upadateActor);
router.param('id_actr', actorController.deleteActorById);
router.param('id_Act', actorController.findActorById);


module.exports = router;