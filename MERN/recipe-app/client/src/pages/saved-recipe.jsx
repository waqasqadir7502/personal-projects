import "../stylesheet/saved-recipe.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

function SavedRecipe() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
   
    // Fetching Saved Recipes from Database with logged in user
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        console.log(response.data.savedRecipes)
      } catch (err) {
        console.error(err);
      }
    };
    fetchSavedRecipes();
  }, []);


  return (
    <div className="saved-recipe-page">
      <h1>Saved Recipes</h1>
      <div className="saved-posts">
        {savedRecipes.map((recipe) => (
          <div key={recipe._id} className="saved-post">
          <div className="post-head">
            <div className="col-1">
              <h2 className="recipe-name">{recipe.name}</h2>
              <p className="user-id"><b>user:</b> {recipe.authorID}</p>
            </div>
          </div>
          <img
            src={recipe.imageURL}
            alt={recipe.name}
            className="recipe-img"
          />
          <p className="cook-time">
            Cooking Time: {recipe.cookingTime} minutes
          </p>
          <div className="instructions">
            <p>Instructions: <br />{recipe.instruction}</p>
          </div>
          <div>
              <p>Ingredients:</p>
            <ul className="ingredient-ul">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredients-li">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default SavedRecipe;
