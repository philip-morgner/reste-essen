import React from "react";
import { Redirect } from "react-router-dom";
import { Eclipse } from "react-loading-io";
import { isEmpty } from "ramda";

import ListCell from "../components/ListCellComponent";

import {
  centerStyle,
  gridStyleRecipePage as gridStyle,
  flexColumnStyle,
} from "../styles";

const GET_RECIPE_URL = "https://food.mabiphmo.de:3001/";

class RecipePage extends React.Component {
  state = { recipe: {}, goBack: false };

  async componentDidMount() {
    const {
      match: {
        params: { recipeId },
      },
    } = this.props;

    const specificRecipeUrl = GET_RECIPE_URL + recipeId;

    const recipe = await fetch(specificRecipeUrl)
      .then((data) => data.json())
      .catch((err) =>
        console.log("ERROR in server communication", err.message)
      );

    this.setState({ recipe });
  }

  handleGoBack = () => {
    this.setState({ goBack: true });
  };

  renderGoBackButton = (backupState) => (
    <button className="button is-link is-outlined" onClick={this.handleGoBack}>
      Zurück zu allen Rezepten
    </button>
  );

  renderIngredients = (ingredients) =>
    ingredients.map(({ name, amount, measure }, i) => {
      const prettyAmount =
        measure === "absolute" ? `${amount} Stück` : `${amount}${measure}`;
      return <ListCell key={i} value={{ name, prettyAmount }} isRecipeCell />;
    });

  renderRedirect = (backupState) => (
    <Redirect to={{ pathname: "/find-recipe", state: backupState }} />
  );

  render() {
    const {
      recipe,
      recipe: { ingredients, prep },
      goBack,
    } = this.state;

    const {
      location: { state: backupState },
    } = this.props;

    if (isEmpty(recipe)) {
      return (
        <div className={centerStyle}>
          <Eclipse size={64} />
        </div>
      );
    }

    return goBack ? (
      this.renderRedirect(backupState)
    ) : (
      <div className={gridStyle}>
        <div className={flexColumnStyle}>
          <h5 className="subtitle is-5">Zutaten</h5>
          <div className="list">{this.renderIngredients(ingredients)}</div>
          <div>{this.renderGoBackButton(backupState)}</div>
        </div>
        <div className="box">
          <p>{prep}</p>
        </div>
      </div>
    );
  }
}

export default RecipePage;
