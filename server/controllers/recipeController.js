const Recipe = require('../models/Recipe');


exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find(); // This should return an array
        res.status(200).json(recipes); // Send the array to the frontend
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Fetch a recipe by ID
exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new recipe
exports.createRecipe = async (req, res) => {
    const { title, ingredients, instructions, imageUrl } = req.body;
    const recipe = new Recipe({ title, ingredients, instructions, imageUrl});
    
    try {
        const newRecipe = await recipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a recipe by ID
exports.updateRecipe = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a recipe by ID
exports.deleteRecipe = async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Recipe deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Toggle the bookmark status of a recipe
exports.bookmarkRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        // Toggle the bookmarked field
        recipe.bookmarked = !recipe.bookmarked;
        const updatedRecipe = await recipe.save();
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
