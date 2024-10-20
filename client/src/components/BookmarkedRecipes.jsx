import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/BookmarkedRecipes.css';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from './ui/button';

const BookmarkedRecipes = () => {
    const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);

    useEffect(() => {
        const fetchBookmarkedRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/recipes');
                
                const bookmarked = response.data.filter(recipe => recipe.bookmarked);
                setBookmarkedRecipes(bookmarked);
            } catch (error) {
                console.error('Error fetching bookmarked recipes:', error);
            }
        };

        fetchBookmarkedRecipes();
    }, []);

    return (
        <div>
            <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Bookmarked Recipes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedRecipes.length > 0 ? (
                bookmarkedRecipes.map((recipe) => (
                    <Card key={recipe._id} className="flex flex-col">
                        <CardHeader>
                        <CardTitle>
                        <h2>{recipe.title}</h2></CardTitle>
                        </CardHeader>
                        <CardContent  className="flex-grow">
                        {recipe.imageUrl && (
                            <img
                                src={recipe.imageUrl}
                                alt={recipe.title}
                                 className="w-full h-48 object-cover rounded-md mb-4"
                            />

                        )}
                        <h3 className="font-semibold mb-2">Ingredients:</h3>
                        <p>{recipe.ingredients.join(', ')}</p>
                        </CardContent>
                        <CardFooter>
                        <Button className='bg-blue-500 hover:bg-blue-600'>
                        <Link to={`/recipes/${recipe._id}`} className='text-white hover:text-white'>View Details</Link></Button>
                        </CardFooter>
                    </Card>
                    
                ))
            ) : (
                <p>No bookmarked recipes found.</p>
                
            )}
        </div>
        </div>
        </div>
    );
};

export default BookmarkedRecipes;
