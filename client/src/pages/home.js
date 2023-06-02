import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import './home.css'

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
    <h1 className="title">Recipes</h1>
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <li key={recipe._id} className="recipe-item">
          <div className="recipe-header">
            <h2 className="recipe-name">{recipe.name}</h2>
            <button
              onClick={() => saveRecipe(recipe._id)}
              disabled={isRecipeSaved(recipe._id)}
              className={`save-button ${isRecipeSaved(recipe._id) ? 'saved' : ''}`}
            >
              {isRecipeSaved(recipe._id) ? 'Saved' : 'Save'}
            </button>
          </div>
          <div className="instructions">
            <p>{recipe.instructions}</p>
          </div>
          <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
          <p className="cooking-time">Cooking Time: {recipe.cookingTime} minutes</p>
        </li>
      ))}
    </ul>
  </div>
  );
};
