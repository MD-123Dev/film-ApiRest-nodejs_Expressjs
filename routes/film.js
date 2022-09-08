
const express = require('express');

const router = express.Router();


const filmController = require('../controllers/FilmController')
        


/**create routes  */
     
router.post("/film",filmController.createProduct);
router.get("/film/:id",filmController.filmById);
router.get("/film",filmController.getAllFilms);
router.delete("/film",filmController.deleteAllFilms);

router.delete("/film/:id_film",filmController.deleteFilm);
router.put("/film/:id_movie",filmController.updateFilm);

router.get("/search",filmController.searchFilm);


router.param('id', filmController.filmById)
router.param('id_film', filmController.deleteFilm)
router.param('id_movie', filmController.updateFilm)
module.exports = router;