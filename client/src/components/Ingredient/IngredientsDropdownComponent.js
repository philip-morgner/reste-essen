import React from "react";
import classnames from "classnames";

import { adjustWidth, hoverStyle } from "../../styles";

class IngredientsDropdownComponent extends React.PureComponent {
  handleChange = e => {
    this.props.onChange(e.target.value);
  };

  handleClick = item => () => {
    this.props.onClick(item);
  };

  getFilteredIngredients = (text, availableIngr, ingredients) => {
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

  render() {
    const { text, availableIngr, ingredients } = this.props;
    const filteredIngredients = this.getFilteredIngredients(
      text,
      availableIngr,
      ingredients
    );
    const showDropdown = filteredIngredients.length && text.length;

    return (
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
    );
  }
}

export default IngredientsDropdownComponent;
