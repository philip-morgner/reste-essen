import React from "react";

import {
  ingredientListCellStyle,
  inputStyle,
  overflowStyle,
} from "../../styles";

class IngredientComponent extends React.PureComponent {
  handleChange = (name, onChange) => e => {
    const amount = e.target.value;

    onChange(name, amount);
  };

  render() {
    const { ingredient, onChange, onRemove } = this.props;
    const { name, measure } = ingredient;
    const measureLabel = measure === "absolute" ? "Stück" : measure;
    const numberInputStep = measure === "absolute" ? 1 : 50;

    return (
      <div className={ingredientListCellStyle}>
        <label className={overflowStyle} htmlFor={name}>
          {name}
        </label>
        <div className={inputStyle}>
          <input
            className="input is-small"
            id={name}
            type="number"
            step={numberInputStep}
            min="0"
            placeholder="Menge"
            onChange={this.handleChange(name, onChange)}
          />
        </div>
        <label htmlFor={name}>{measureLabel}</label>
        <button className="delete" onClick={onRemove(name)} />
      </div>
    );
  }
}

export default IngredientComponent;
