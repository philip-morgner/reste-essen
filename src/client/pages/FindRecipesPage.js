import React from "react";
import { Eclipse } from "react-loading-io";
import { isEmpty, pathOr } from "ramda";
import { css } from "glamor";
import classnames from "classnames";

import { postData } from "../utils/postData";

import IngredientsDropdown from "../components/Ingredient/IngredientsDropdownComponent";
import IngredientsList from "../components/Ingredient/IngredientsListComponent";
import RecipeList from "../components/Recipe/RecipeListComponent";

const gridStyle = css({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  justifyItems: "center",
});

const errorStyle = css({ alignSelf: "start !important" });

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
    const ingredients = await fetch(URL_INGREDIENTS)
      .then(data => data.json())
      .catch(err => console.log("ERROR in server communication", err.message));

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
          //  (2) hack to restore state after navigation and it worked
          this.setState({
            recipes,
            availableIngr: backup.availableIngr,
            mode: backup.mode,
          });
          /* eslint-disable-next-line */
          history.replaceState("/find-recipe", null);
        }
      } catch (err) {
        console.log("ERROR in server communication", err.message);
      }
    }

    this.setState({ ingredients });
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
    <div className={classnames("notification is-danger", `${errorStyle}`)}>
      <button className="delete" onClick={this.dismissError}></button>
      There are no recipes available with your ingredients,
      <strong> better buy some more stuff!</strong> Or check your fridge :)
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
    //  (1) hack to restore state after navigation
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
