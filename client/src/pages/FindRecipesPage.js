import React from "react";
import { Eclipse } from "react-loading-io";
import { isEmpty, pathOr } from "ramda";
import { css } from "glamor";
import classnames from "classnames";

import { postData } from "../utils/postData";

import IngredientsDropdown from "../components/Ingredient/IngredientsDropdownComponent";
import IngredientsList from "../components/Ingredient/IngredientsListComponent";
import RecipeList from "../components/Recipe/RecipeListComponent";

import { gridStyleFindRecipesPage as gridStyle, errorStyle } from "../styles";

const URL_RECIPES = "http://localhost:3001";
const URL_INGREDIENTS = "http://localhost:3001";

class FindRecipesPage extends React.Component {
  state = {
    availableIngr: [],
    text: "",
    recipes: [],
    ingredients: [],
    loading: false,
    error: false,
    mode: "",
  };

  async componentDidMount() {
    // (1) fetch ingredients for suggestions in dropdown
    try {
      let ingredients = await fetch(URL_INGREDIENTS).then(data => data.json());

      this.setState({ ingredients });
    } catch (err) {
      console.log("ERROR in server communication", err.message);

      this.props.history.push("/server-down");
    }

    // (2) fetch previous state after going back from navigating into a recipe (see (2) in render)
    const backup = pathOr({}, ["location", "state"], this.props);
    let recipes = [];

    if (!isEmpty(backup)) {
      const body = JSON.stringify({
        ingredients: backup.availableIngr,
        mode: backup.mode,
      });

      try {
        let data = await postData(URL_RECIPES, body);

        if (data !== undefined) {
          recipes = await data.json();

          this.setState({
            recipes,
            availableIngr: backup.availableIngr,
            mode: backup.mode,
          });
          // (2) forget backup so after user reloads page is new/ empty
          history.replaceState("/find-recipe", null); /* eslint-disable-line */
        }
      } catch (err) {
        console.log("ERROR in server communication", err.message);
      }
    }
  }

  handleInputChange = text => {
    this.setState({ text });
  };

  handleDropdownClick = ingredient => {
    this.setState(prev => ({
      availableIngr: [...prev.availableIngr, { ...ingredient, amount: 0 }],
      text: "",
    }));
  };

  handleSubmit = mode => async () => {
    const { availableIngr } = this.state;
    const body = JSON.stringify({
      ingredients: availableIngr,
      mode,
    });

    this.setState({ loading: true, recipes: [], error: false, mode });

    try {
      let data = await postData(URL_RECIPES, body);

      if (data !== undefined) {
        let recipes = await data.json();

        if (isEmpty(recipes)) {
          this.setState({ error: true, loading: false });
        } else {
          this.setState({ recipes, loading: false, error: false });
        }
      }
    } catch (err) {
      console.log("ERROR in server communication", err.message);
      this.setState({ loading: false });
    }
  };

  handleAmountInput = (name, amount) => {
    this.setState(prev => ({
      availableIngr: prev.availableIngr.map(elem =>
        elem.name === name ? { ...elem, amount } : elem
      ),
    }));
  };

  handleRemoveItem = value => () => {
    this.setState(prev => ({
      availableIngr: prev.availableIngr.filter(({ name }) => name !== value),
    }));
  };

  dismissError = () => {
    this.setState({ error: false });
  };

  renderErrorNotification = () => (
    <div className={classnames("notification is-info", `${errorStyle}`)}>
      <button className="delete" onClick={this.dismissError} />
      Es sind keine Rezepte mit den eingegebenen Zutaten und Mengen verfügbar.{" "}
      <strong>
        Bitte prüfe, ob du alle deine Zutaten und dessen Mengen eingegeben hast.{" "}
      </strong>
      Ansonsten, guck nochmal in den Kühlschrank oder geh einkaufen!
    </div>
  );

  render() {
    const {
      text,
      availableIngr,
      recipes,
      loading,
      ingredients,
      error,
      mode,
    } = this.state;
    const showRecipes = !isEmpty(recipes);
    //  (2) hack to restore state after navigation into recipe
    const backupState = { availableIngr, mode };

    return (
      <div className={gridStyle}>
        <IngredientsDropdown
          text={text}
          availableIngr={availableIngr}
          ingredients={ingredients}
          onChange={this.handleInputChange}
          onClick={this.handleDropdownClick}
        />
        <IngredientsList
          availableIngr={availableIngr}
          onSubmit={this.handleSubmit}
          onChange={this.handleAmountInput}
          onRemove={this.handleRemoveItem}
        />
        {loading && <Eclipse size={32} />}
        {showRecipes && (
          <RecipeList recipes={recipes} backupState={backupState} />
        )}
        {error && this.renderErrorNotification()}
      </div>
    );
  }
}

export default FindRecipesPage;
