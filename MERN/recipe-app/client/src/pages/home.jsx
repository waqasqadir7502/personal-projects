import "../stylesheet/home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies("access_token");
  const userID = useGetUserID();

  useEffect(() => {
    // Fetching Recipes from DB
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetching Saved Recipes from Database with logged in user
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        console.log(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipes();

    if (cookies.access_token) {
      fetchSavedRecipes();
    }
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
      console.log(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <div className="post-page">
        <h1 className="heading">Browse Recipes</h1>

        {recipes.map((recipe) => (
          <div key={recipe._id} className="posts">
            <div className="post-head">
              <div className="col-1">
                <h2 className="recipe-name">{recipe.name}</h2>
                <p className="user-id"><b>user:</b> {recipe.authorID.userID}</p>
              </div>
              <div className="col-2">
                <button
                  className="save-btn"
                  onClick={() => {
                    saveRecipe(recipe._id);
                  }}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
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

export default Home;
