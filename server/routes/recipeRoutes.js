const express = require('express');
const router = express.Router();
const {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
} = require('../controllers/recipeController');
const { bookmarkRecipe } = require('../controllers/recipeController');

router.get('/recipes', getAllRecipes);
router.get('/recipes/:id', getRecipeById);
router.post('/recipes', createRecipe);
router.put('/recipes/:id', updateRecipe);
router.delete('/recipes/:id', deleteRecipe);
router.put('/recipes/:id/bookmark', bookmarkRecipe);

module.exports = router;
