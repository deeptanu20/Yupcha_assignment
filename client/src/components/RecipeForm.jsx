import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import { PlusCircle } from "lucide-react"

const RecipeForm = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const { id } = useParams(); 
    const navigate = useNavigate();

 const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (id) {
           
            setIsEditMode(true);
            
            const fetchRecipe = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/recipes/${id}`); //changed here
                    const recipe = response.data;
                    setTitle(recipe.title);
                    setIngredients(recipe.ingredients.join(', ')); // Convert array to comma-separated string
                    setInstructions(recipe.instructions);
                    setImageUrl(recipe.imageUrl || '');
                } catch (error) {
                    console.error('Error fetching the recipe:', error);
                }
            };

            fetchRecipe();
        }
    }, [id]); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        console.log('Form is submitting...');

        const recipeData = {
            title,
            ingredients: ingredients.split(',').map(ingredient => ingredient.trim()), // Convert comma-separated string to an array
            instructions,
            imageUrl
        };

        console.log('Recipe Data:', recipeData); // Check if recipe data is correct

    //     try {
    //         const response = await axios.post('http://localhost:5000/api/recipes', recipeData);

    //         console.log('Response from server:', response.data);
            
    //         alert('Recipe added successfully!');
    //         setTitle('');
    //         setIngredients('');
    //         setInstructions('');
    //         setImageUrl('');
    //         navigate('/'); // Call the success handler (e.g., to refresh the list or show a message)
    //     } catch (error) {
    //         console.error('Error creating the recipe:', error);
    //     }
    // };


    try {
        if (isEditMode) {
            // Update existing recipe
            await axios.put(`http://localhost:5000/api/recipes/${id}`, recipeData);
            alert('Recipe updated successfully!');
        } else {
            // Add new recipe
            await axios.post('http://localhost:5000/api/recipes', recipeData);
            alert('Recipe added successfully!');
        }

       
        navigate('/');
    } catch (error) {
        console.error('Error submitting the recipe:', error);
    }
};


    return (
     
      <Card className="w-full max-w-2xl mx-auto bg-gradient-to-b from-background to-secondary/10 p-6">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-3xl font-bold text-center">Add New Recipe</CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Fill in the details below to add your delicious recipe
        </p>
      </CardHeader>
      <CardContent className="p-6">
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='space-y-2'>
                    <label className='text-base'>Title:</label>
                    <Input
                        type="text"
                        id='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Recipe Title"
                        required
                    />
                </div>
                <div className='space-y-2'>
                    <label className='text-base'>Ingredients (comma separated):</label>
                    <Input
                        type="text"
                        id='ingredients'
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        placeholder="Ingredients"
                        required
                    />
                </div>
                <div className='space-y-2'>
                    <label className='text-base'>Instructions:</label>
                    <Textarea
                        id='instructions'
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="Instructions"
                        required
                        className="min-h-[120px] resize-y"
                    />
                </div>
                <div className='space-y-2'>
                    <label className='text-base'>Image URL:</label>
                    <Input
                        id='imageUrl'
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)} // Handle image URL input
                        placeholder="Image URL"
                    />
                </div>
                <Button className='w-full h-11 rounded-md hover:bg-slate-900  text-base bg-gray-900 text-white' type="submit">
                <PlusCircle className="mr-2 h-5 w-5" />
                    {isEditMode ? 'Update Recipe' : 'Add Recipe'}</Button>
            </form>
            </CardContent>
            </Card>
        
    );
};

export default RecipeForm;

