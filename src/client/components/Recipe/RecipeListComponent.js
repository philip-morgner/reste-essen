import React from "react";
import { isEmpty } from "ramda";
import classnames from "classnames";
import { css } from "glamor";

import { t } from "../../translationKeys";

import ListCell from "../ListCellComponent";
import RecipeListFilter from "./RecipeListFilterComponent";

const adjustWidth = css({
  width: "30vw",
});

const adjustHeight = css({
  fontSize: "2.5em",
});

const hoverStyle = css({
  cursor: "pointer",
  ":hover": { backgroundColor: "#EEEEEE" },
});

const PREP_TIME_FILTERS = ["fast", "slow", "both"];
const VEGGIE_FILTERS = ["all", "vegetarian", "vegan"];

class RecipeListComponent extends React.Component {
  state = {
    prepTime: "",
    veggie: "",
  };

  handleFilters = propName => value => {
    this.setState({ [propName]: value });
  };

  handlePrepTimeFilter = value => () => {
    const prepTime = value === "both" ? "" : value;
    this.handleFilters("prepTime")(prepTime);
  };

  handleVeggieFilter = value => () => {
    const veggie = value === "all" ? "" : value;
    this.handleFilters("veggie")(veggie);
  };

  filterByPrepTime = recipes => {
    return recipes.filter(r => {
      const {
        filters: { duration },
      } = r;
      const { prepTime } = this.state;

      return prepTime === "fast" ? duration <= 30 : duration > 30;
    });
  };

  filterByVeggie = recipes => {
    return recipes.filter(r => {
      const {
        filters: { veggie },
      } = r;
      const { veggie: veggieState } = this.state;

      return veggie === veggieState;
    });
  };

  filterRecipes = recipes => {
    const { prepTime, veggie } = this.state;

    let filteredRecipes = recipes;

    recipes.forEach(recipe => {
      if (!isEmpty(prepTime)) {
        filteredRecipes = this.filterByPrepTime(filteredRecipes);
      }
      if (!isEmpty(veggie)) {
        filteredRecipes = this.filterByVeggie(filteredRecipes);
      }
    });

    return filteredRecipes;
  };

  renderRecipes = recipes => {
    return recipes.map((r, i) => (
      <ListCell key={i} value={r.name} isRecipeCell />
    ));
  };

  render() {
    const { recipes } = this.props;
    const { prepTime, veggie } = this.state;
    const showRecipes = !isEmpty(recipes);
    const filteredRecipes = this.filterRecipes(recipes);

    const selectedPrepTime = isEmpty(prepTime) ? "both" : prepTime;
    const selectedVeggie = isEmpty(veggie) ? "all" : veggie;
    return (
      <div>
        <h6 className="title is-6">Rezepte</h6>
        <RecipeListFilter
          filters={PREP_TIME_FILTERS}
          onClick={this.handlePrepTimeFilter}
          selected={selectedPrepTime}
        />
        <RecipeListFilter
          filters={VEGGIE_FILTERS}
          onClick={this.handleVeggieFilter}
          selected={selectedVeggie}
        />
        <div className={classnames(showRecipes && "list", `${adjustWidth}`)}>
          {this.renderRecipes(filteredRecipes)}
        </div>
      </div>
    );
  }
}

export default RecipeListComponent;
