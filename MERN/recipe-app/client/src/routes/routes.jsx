import React from "react";
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Home from "../pages/home";
import CreateRecipe from "../pages/create-recipe";
import SavedRecipe from "../pages/saved-recipe";
import Auth from "../pages/auth";
import Navbar from "../components/navbar";

function MyRoutes() {
 return(<>
    <Router>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/auth" element={<Auth/>} />
            <Route path="/create-recipe" element={<CreateRecipe/>} />
            <Route path="/saved-recipe" element={<SavedRecipe/>} />
        </Routes>
    </Router>
 </>)
}

export default MyRoutes