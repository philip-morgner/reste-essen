import React from "react";
import { isEmpty, times } from "ramda";
import classnames from "classnames";
import { css } from "glamor";

import { t } from "../translationKeys";
import { postData } from "../utils/postData";

import ListCell from "../components/ListCellComponent";
import RecipeList from "../components/Recipe/RecipeListComponent";

const gridStyle = css({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  justifyItems: "center",
});

const borderStyle = css({
  padding: "0 1.5vw",
  borderRight: "1px dotted grey",
  borderLeft: "1px dotted grey",
});

const adjustWidth = css({
  width: "30vw",
});

const hoverStyle = css({
  cursor: "pointer",
  ":hover": { backgroundColor: "#EEEEEE" },
});

const URL_RECIPES = "http://localhost:3001";
const URL_INGREDIENTS = "http://localhost:3001";

class FindRecipesPage extends React.Component {
  state = {
    availableIngr: [],
    text: "",
    recipes: [],
    ingredients: [],
  };

  async componentDidMount() {
    const ingredients = await fetch(URL_INGREDIENTS)
      .then(data => data.json())
      .catch(err => console.log("ERROR in server communication", err.message));
    console.log(
      "FindRecipesPage -> componentDidMount -> ingredients",
      ingredients
    );

    this.setState({ ingredients });
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleClick = ingredient => () => {
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

    try {
      let data = await postData(URL_RECIPES, body);
      if (data !== undefined) {
        const recipes = await data.json();
        console.log("RESULT", recipes);
        this.setState({ recipes });
      }
    } catch (err) {
      console.log("ERROR in server communication", err.message);
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

  getFilteredIngredients = () => {
    const { text, availableIngr, ingredients } = this.state;
    const lowerCaseText = text.toLowerCase();

    return ingredients.filter(({ name }) => {
      const lowerCaseName = name.toLowerCase();
      return (
        // user input matches ingredient
        lowerCaseName.includes(lowerCaseText) &&
        // ingredient is NOT already in state
        !availableIngr.some(({ name }) => name.toLowerCase() === lowerCaseName)
      );
    });
  };

  renderDropdownItem = (item, i) => (
    <div
      key={i}
      className={classnames("dropdown-item", `${hoverStyle}`)}
      onClick={this.handleClick(item)}>
      <p>{item.name}</p>
    </div>
  );

  renderEmptyListCell = i => <ListCell key={i} isEmpty />;

  renderListStructure = length => times(this.renderEmptyListCell, length);

  // make component
  renderSummary = availableIngr =>
    availableIngr.map((ingredient, i) => (
      <ListCell
        key={i}
        value={ingredient}
        onRemove={this.handleRemoveItem}
        onChange={this.handleAmountInput}
        isIngredientCell
      />
    ));

  render() {
    const { text, availableIngr, recipes } = this.state;
    const filteredIngredients = this.getFilteredIngredients();
    const showDropdown = filteredIngredients.length && text.length;
    const showRecipes = !isEmpty(recipes);
    const previewListLength =
      availableIngr.length <= 10 ? 10 - availableIngr.length : 0;

    return (
      <div className={gridStyle}>
        <div>
          <h6 className="title is-6">Was hast du denn noch da zum Kochen?</h6>
          <div className={classnames("dropdown", showDropdown && "is-active")}>
            <div className="dropdown-trigger">
              <div className="field">
                <div className="control">
                  <input
                    onChange={this.handleChange}
                    className={classnames("input", `${adjustWidth}`)}
                    type="text"
                    placeholder="Zutat..."
                    aria-haspopup="true"
                    aria-controls="menu"
                    value={text}
                  />
                </div>
              </div>
            </div>
            <div className="dropdown-menu" id="menu" role="menu">
              <div className={classnames("dropdown-content", `${adjustWidth}`)}>
                {filteredIngredients.map((item, i) =>
                  this.renderDropdownItem(item, i)
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={borderStyle}>
          <h6 className="title is-6">Machen wir mal ne Liste...</h6>
          <div className="list">
            {this.renderSummary(availableIngr)}
            {this.renderListStructure(previewListLength)}
          </div>
          <button
            className="button is-link is-pulled-left"
            onClick={this.handleSubmit("explore")}>
            {t("explore")}
          </button>
          <button
            className="button is-success is-pulled-right"
            onClick={this.handleSubmit("exact")}>
            {t("exact")}
          </button>
        </div>
        {showRecipes && <RecipeList recipes={recipes} />}
      </div>
    );
  }
}

export default FindRecipesPage;
