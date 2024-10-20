import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';  //extra
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'


const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state
    const [filteredRecipes, setFilteredRecipes] = useState([]);  //extra

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/recipes');
                console.log('Fetched recipes:', response.data); // Log the response data
                setRecipes(response.data); 
                setFilteredRecipes(response.data);   //1
                setLoading(false);
            } catch (err) {
                console.error('Error fetching recipes:', err);
                
                setLoading(false);
            }
        };
    
        fetchRecipes();
    }, []);






    const handleSearch = (query) => {    
        const filtered = recipes.filter(
            (recipe) =>
                recipe.title.toLowerCase().includes(query.toLowerCase()) ||
                recipe.ingredients.join(', ').toLowerCase().includes(query.toLowerCase())
        );
        setFilteredRecipes(filtered);
    };



    const toggleBookmark = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/recipes/${id}/bookmark`);
            const updatedRecipe = response.data;

            // Update the local state with the updated bookmarked status
            setRecipes((prevRecipes) =>
                prevRecipes.map((recipe) =>
                    recipe._id === updatedRecipe._id ? updatedRecipe : recipe
                )
            );

            // Show toast notification and alert based on the bookmark status
            if (updatedRecipe.bookmarked) {
                alert('Recipe has been bookmarked!'); 
            } else {      
                alert('Bookmark has been removed!'); 
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold mb-4">Recipe List</h1>
        <SearchBar onSearch={handleSearch} />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8'> 
        {Array.isArray(filteredRecipes) && filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
                
                <Card key={recipe._id} className='shadow-lg'>
                     <CardHeader>
                     <CardTitle><h2 className='text-lg font-semibold'>{recipe.title}</h2></CardTitle>
                     </CardHeader>
                     <CardContent>
                    {recipe.imageUrl && (
                            <img
                                src={recipe.imageUrl}
                                alt={recipe.title}
                                // style={{ width: '300px', height: '180px', objectFit: 'cover', marginBottom: '10px' }}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                        )}
                    <p>{recipe.ingredients.join(', ')}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                     <Button variant='outline'>
                    <Link to={`/recipes/${recipe._id}`}>View Details</Link>
                    </Button>   
                       {/* Bookmark button */}
                       <Button onClick={() => toggleBookmark(recipe._id)}>
                            {recipe.bookmarked ? 'Unbookmark' : 'Bookmark'}
                        </Button>
                        </CardFooter>
                </Card>
                
            ))
        ) : (
            <p className="text-center text-muted-foreground">No recipes found.</p>  // Handle case where no recipes are found or API response is not an array
        )}
        </div>
    </div>
    );
};

export default RecipeList;
