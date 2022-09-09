
const express = require('express');

const router = express.Router();


const categoryController = require('../controllers/CategoryController')
        


router.get("/category",categoryController.getAllCategory);
router.post("/category",categoryController.createCategory);
router.put("/category/:id_category",categoryController.upadateCategory);
router.delete("/category/:id_categ",categoryController.deleteCategoryById);
router.get("/category/:id_catg",categoryController.findCategoryById);


router.param('id_category', categoryController.upadateCategory);
router.param('id_categ', categoryController.deleteCategoryById);
router.param('id_catg', categoryController.findCategoryById);


module.exports = router;