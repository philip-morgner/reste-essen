import React from "react";
import { isNil } from "ramda";
import classnames from "classnames";
import { css } from "glamor";
import { t } from "../translationKeys";

import IngredientListCell from "./Ingredient/IngredientListCellComponent";

const cellStyle = css({
  width: "30vw",
});

const adjustHeight = css({
  fontSize: "2.5em",
});

class ListCellComponent extends React.Component {
  state = {};

  render() {
    const {
      isIngredientCell,
      isRecipeCell,
      value,
      onChange,
      onRemove,
    } = this.props;
    const isEmpty = !isIngredientCell && !isRecipeCell;
    console.log("ListCellComponent -> render -> value", value);

    return (
      <div
        className={classnames(
          "list-item",
          `${cellStyle}`,
          isEmpty && `${adjustHeight}`
        )}>
        {isIngredientCell && (
          <IngredientListCell
            ingredient={value}
            onChange={onChange}
            onRemove={onRemove}
          />
        )}
        {isRecipeCell && <p>{value}</p>}
      </div>
    );
  }
}

export default ListCellComponent;
