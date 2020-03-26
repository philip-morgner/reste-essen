import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "bulma/css/bulma.css";

import Layout from "./pages/Layout";
import Init from "./pages/Init";
import FindRecipesPage from "./pages/FindRecipesPage";
import Home from "./pages/Home";
import AddRecipesPage from "./pages/FindRecipesPage";
import RecipePage from "./pages/RecipePage";
import ServerDownPage from "./pages/ServerDown";

const appRouter = (
  <Router>
    <Route path="/" component={Layout} />
    <Route exact path="/" component={Init} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/find-recipe" component={FindRecipesPage} />
    <Route exact path="/add-recipe" component={AddRecipesPage} />
    <Route exact path="/find-recipe/:recipeId" component={RecipePage} />
    <Route exact path="/server-down" component={ServerDownPage} />
  </Router>
);

ReactDOM.render(appRouter, document.getElementById("root"));
