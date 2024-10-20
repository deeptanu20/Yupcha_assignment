import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeDetail from './components/RecipeDetail'; // Import the detail component
import Navbar from './components/Navbar';
import BookmarkedRecipes from './components/BookmarkedRecipes';


const App = () => {
    return (
        <BrowserRouter>
          <Navbar/>
            <Routes>
                <Route path="/" element={<RecipeList />} />
                <Route path="/add-recipe" element={<RecipeForm />} />
                <Route path="/recipes/:id" element={<RecipeDetail />} />
                <Route path="/recipes/:id/edit" element={<RecipeForm/>} />
                <Route path="/bookmarked" element={<BookmarkedRecipes />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
