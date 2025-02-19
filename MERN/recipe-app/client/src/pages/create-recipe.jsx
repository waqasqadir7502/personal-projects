import React, { useState } from "react";
import axios from "axios";
import "../stylesheet/create-recipe.css";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function CreateRecipe() {
  // Get logged User ID from local storage
  const userID = useGetUserID();

  // Values of every input
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instruction: "",
    imageURL: "",
    cookingTime: 0,
    authorID: userID,
  });

  //For Authorization of user
  const [cookies, _] = useCookies("access_token");

  // Handles changes of the inputs and set in the state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  // Handle adding ingredients to the ingredients array
  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  // Handle change in each ingredient input
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting recipe:", recipe); // Check if recipe state is correct
    try {
      const response = await axios.post(
        "http://localhost:3001/recipes",
        recipe,
        { headers: { authorization: cookies.access_token } }
      );
      console.log("Response from backend:", response); // Check the response
      alert("Recipe Created");
      setRecipe("");
      navigate("/");
    } catch (error) {
      console.error("Error posting recipe:", error);
      alert("Failed to create recipe. Please try again.");
    }
  };

  return (
    <div className="create-recipe-page">
      <div className="create-section">
        <div className="create-col-1">
          <h2>Create Your Recipe</h2>
          <form onSubmit={handleSubmit} className="create-form">
            <div className="sub-section-1">
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Recipe Name"
                required
              />

              <input
                type="text"
                name="imageURL"
                id="image"
                onChange={handleChange}
                placeholder="Recipe Image URL"
                required
              />
            </div>

            <input
              type="number"
              name="cookingTime"
              id="cookingTime"
              onChange={handleChange}
              placeholder="Cooking Time"
              required
            />

            <textarea
              name="instruction"
              id="instruction"
              onChange={handleChange}
              placeholder="Recipe Instructions"
              required
            ></textarea>

            {recipe.ingredients.map((ingredient, index) => (
              <div key={index}>
                <input
                  type="text"
                  name={`ingredient-${index}`}
                  value={ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                  placeholder="Recipe Ingredients"
                  required
                />
              </div>
            ))}
            <button type="button" onClick={addIngredient} className="add-ingrdnt-btn" required>
              {recipe.ingredients.length === 0
                ? "Add Ingredients"
                : "Add More Ingredients"}
            </button>

            <button type="submit" className="submit">Create Recipe</button>
          </form>
        </div>

        <div className="create-col-2">
          {!recipe.name ? (
            <p className="pre-empty-sec">Preview Your Post Here</p>
          ) : (
            <div className="post">
            <div key={recipe._id} className="saved-post">
              <div className="post-head">
                <div className="col-1">
                  <h2 className="recipe-name">{recipe.name}</h2>
                  <p className="user-id">
                    <b>user:</b> {userID}
                  </p>
                </div>
              </div>
              <img
                src={recipe.imageURL}
                alt={recipe.imageURL}
                className="recipe-img"
              />

              {!recipe.cookingTime ? (
                <p></p>
              ) : (
                <p className="cook-time">
                  Cooking Time: {recipe.cookingTime} minutes
                </p>
              )}
              {!recipe.instruction ? (
                <p></p>
              ) : (
                <div className="instructions">
                  <p>
                    Instructions: <br />
                    {recipe.instruction}
                  </p>
                </div>
              )}
              {recipe.ingredients.length === 0 ? (
                <p></p>
              ) : (
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
              )}
            </div>
            </div>
          )}
        </div>
    
    </div>
    </div>
    
  );
}

export default CreateRecipe;
