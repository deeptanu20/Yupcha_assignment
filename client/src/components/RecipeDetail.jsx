import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Bookmark, Edit, Trash2 } from "lucide-react"

const RecipeDetail = () => {
    const { id } = useParams(); 
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
                setRecipe(res.data);
            } catch (error) {
                console.error('Error fetching the recipe', error);
                setError('Error fetching recipe');
            }
        };

        fetchRecipe();
    }, [id]);


    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                await axios.delete(`http://localhost:5000/api/recipes/${id}`);
                alert('Recipe deleted successfully!');
                navigate('/'); 
            } catch (error) {
                console.error('Error deleting recipe:', error);
            }
        }
    };

    const toggleBookmark = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/recipes/${id}/bookmark`);
            setRecipe(response.data); // Update the recipe with the new bookmark status
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        }
    };




    if (error) {
        return <div>{error}</div>;
    }



    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
            <h1 className='text-3xl font-bold'>{recipe.title}</h1>
            
            <section>
            <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            </section>
            <section>
            <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2">
            <p>{recipe.instructions}</p>
            </ol>
            </section>
            </div>

            <div className="space-y-6">
            <div className="rounded-lg overflow-hidden shadow-lg">
            {recipe.imageUrl && (
                <a href={recipe.imageUrl} target="_blank" rel="noopener noreferrer">
                    <img src={recipe.imageUrl} alt={recipe.title}
                     width={400}
                     height={400}
                    className="w-full h-auto object-cover"
                     />
                </a>
            )}
</div>
            <div className="flex flex-col gap-4">
            <Button onClick={toggleBookmark} variant='outline' className='w-full'>
            <Bookmark className="mr-2 h-4 w-4" />    
                {recipe.bookmarked ? 'Unbookmark' : 'Bookmark'}
            </Button>

            <Button onClick={() => navigate(`/recipes/${id}/edit`)} className='bg-blue-950 hover:bg-blue-600 text-white hover:text-white w-full'>
            <Edit className="mr-2 h-4 w-4" />   
                Edit Recipe</Button>
            <Button onClick={handleDelete} variant='destructive' className='w-full'>
            <Trash2 className="mr-2 h-4 w-4" />   
                Delete Recipe</Button>
        </div>
        </div>
        </div>
        </div>
    );
};

export default RecipeDetail;
