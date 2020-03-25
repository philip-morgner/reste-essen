import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "bulma/css/bulma.css";

import Layout from "./client/pages/Layout";
import Init from "./client/pages/Init";
import FindRecipesPage from "./client/pages/FindRecipesPage";
import Home from "./client/pages/Home";
import AddRecipesPage from "./client/pages/FindRecipesPage";

const appRouter = (
  <Router>
    <Route path="/" component={Layout} />
    <Route exact path="/" component={Init} />
    <Route exact path="/home" component={Home} />
    <Route path="/find-recipe" component={FindRecipesPage} />
    <Route exact path="/add-recipe" component={FindRecipesPage} />
  </Router>
);

ReactDOM.render(appRouter, document.getElementById("root"));
