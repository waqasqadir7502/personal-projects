import express from "express";
import { RecipeModel } from "../model/Recipes.js";
import { UserModel } from "../model/User.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});
router.post("/", verifyToken, async (req, res) => {
  const recipe = await RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put("/", verifyToken, async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID)
        user.savedRecipes.push(recipe)
        await user.save()
        res.json({savedRecipes: user.savedRecipes});
    } catch (err) {
      res.json(err);
    }
  });

  router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        res.json({savedRecipes: user?.savedRecipes});
    } catch (err) {
      res.json(err);
    }
  });  
  
  router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        const savedRecipes = await RecipeModel.find({
            _id: {$in : user.savedRecipes}
        });
        res.json({savedRecipes});
    } catch (err) {
      res.json(err);
    }
  });

export { router as recipesRouter };
