import React from "react";
import { css } from "glamor";

import { t } from "../../translationKeys";

const ingredientListCellStyle = css({
  display: "grid",
  gridTemplateColumns: "10fr 6fr 4fr 1fr",
  alignItems: "center",
});

const inputStyle = css({
  justifySelf: "center",
  display: "inline",
  width: "80%",
});

const overflowStyle = css({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
});

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
            placeholder="amount"
            onChange={this.handleChange(name, onChange)}
          />
        </div>
        <label htmlFor={name}>{measureLabel}</label>
        <button className="delete" onClick={onRemove(name)}></button>
      </div>
    );
  }
}

export default IngredientComponent;
