import express from "express";
import cors from 'cors';
import mongoose from "mongoose"

import { userRouter } from "./router/user.js";
import { recipesRouter } from "./router/recipes.js";


const app = express()

mongoose.connect("mongodb+srv://waqasqadir942:NFYp1xsrQ5QhPnUQ@cluster1.8aakm.mongodb.net/recipe-app?retryWrites=true&w=majority&appName=Cluster1" )

app.use(express.json())
app.use(cors())
app.use("/auth", userRouter)
app.use("/recipes", recipesRouter)

app.listen(3001, () =>{
    console.log("Server Is Running")
})