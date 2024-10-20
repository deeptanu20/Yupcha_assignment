# MERN Stack Food_Recipe_Viewer App 🍕

This is a **MERN Stack** (MongoDB, Express, React, Node.js) application for managing recipes. It allows users to **add**, **view**, **edit**, **bookmark**, and **search** for recipes.

## Features ✨

- **View All Recipes**: Users can view all the recipes listed on the homepage.
- **Search Functionality**: Easily search recipes by title or ingredients.
- **Add New Recipe**: Users can add a new recipe with details like ingredients and instructions.
- **Bookmark Recipes**: Bookmark your favorite recipes and view them later.
- **Edit Recipes**: Easily edit existing recipes.
- **Delete Recipes**: Remove recipes from the list.
- **Responsive Design**: Works seamlessly across all devices (mobile, tablet, desktop).

## Technologies Used 🛠️
**Frontend**:React, Tailwind CSS,Shadcn.
**Backend**: Node.js, Express
**Database**:MongoDB

## API Documentation 📡

### Base URL: `http://localhost:5000/api/recipes`

| HTTP Method | Endpoint           | Description                                          |
|-------------|--------------------|------------------------------------------------------|
| **GET**     | `/`                | Fetches all recipes.                                |
| **GET**     | `/:id`             | Fetches a specific recipe by ID.                     |
| **POST**    | `/`                | Creates a new recipe. Requires recipe details.       |
| **PUT**     | `/:id`             | Updates an existing recipe by ID.                    |
| **PUT**     | `/:id/bookmark`    | Toggles the bookmark status of a recipe by ID.       |
| **DELETE**  | `/:id`             | Deletes a recipe by ID.                              |

### Example Requests

#### Fetch All Recipes
```bash
GET /api/recipes

#Create a New Recipe

POST /api/recipes
{
    "title": "Chicken Biriyani",
    "ingredients": ["chicken", "rice", "spices", "yogurt"],
    "instructions": "Mix chicken with yogurt, biryani masala, etc.",
    "imageUrl": "https://example.com/chicken-biryani.jpg"
}

# Update a Recipe

PUT /api/recipes/:id
{
    "title": "Updated Recipe Title",
    "ingredients": ["ingredient1", "ingredient2"],
    "instructions": "Updated instructions.",
    "imageUrl": "https://example.com/updated-image.jpg"
}

#Toggle Bookmark Status

PUT /api/recipes/:id/bookmark

#Delete a Recipe

DELETE /api/recipes/:id
