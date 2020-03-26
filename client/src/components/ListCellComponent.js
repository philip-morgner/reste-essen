import React from "react";
import { Link } from "react-router-dom";
import { omit } from "ramda";
import classnames from "classnames";

import Ingredient from "./Ingredient/IngredientComponent";
import {
  adjustWidth as cellStyle,
  adjustHeight,
  flexStyleWithColor as flexStyle,
  disableLinkStyle,
} from "../styles";

class ListCellComponent extends React.PureComponent {
  render() {
    const {
      isIngredientCell,
      isRecipeCell,
      value,
      onChange,
      onRemove,
      disableLink,
      backupState,
    } = this.props;

    const isEmpty = !isIngredientCell && !isRecipeCell;

    // little hack to reuse this component in RecipePage
    let recipe;
    if (isRecipeCell) {
      recipe = omit(["recipeId"], value);
    }

    return (
      <div
        className={classnames(
          "list-item",
          `${cellStyle}`,
          isEmpty && `${adjustHeight}`
        )}>
        {isIngredientCell && (
          <Ingredient
            ingredient={value}
            onChange={onChange}
            onRemove={onRemove}
          />
        )}
        {isRecipeCell && (
          <Link
            to={{
              pathname: `/find-recipe/${value.recipeId}`,
              state: backupState,
            }}
            className={classnames(
              `${flexStyle}`,
              disableLink && `${disableLinkStyle}`
            )}>
            {Object.keys(recipe).map((key, i) => (
              <p key={i}>{recipe[key]}</p>
            ))}
          </Link>
        )}
      </div>
    );
  }
}

export default ListCellComponent;
