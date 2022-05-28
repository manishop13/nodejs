const express=require('express');

const router = express.Router();

const recipeController = require('../controllers/recipeController');
// app routes

router.get('/', recipeController.homepage );
router.get('/categories', recipeController.explorecategory);
router.get('/recipe/:id', recipeController.exploreRecipe);
router.get('/categories/:id', recipeController.explorecategoryById);
router.post('/search',recipeController.searchRecipe);
router.get('/submit-recipe',recipeController.submitrecipe);
router.post('/submit-recipe',recipeController.submitRecipeOnPost);

module.exports = router;