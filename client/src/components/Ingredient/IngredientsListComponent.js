import React from "react";
import { times } from "ramda";

import ListCell from "../ListCellComponent";
import { flexStyleIngredientsList as flexStyle } from "../../styles";

class IngedientsListComponent extends React.PureComponent {
  renderEmptyListCell = i => <ListCell key={i} isEmpty />;

  renderListStructure = length => times(this.renderEmptyListCell, length);

  renderSummary = availableIngr =>
    availableIngr.map((ingredient, i) => {
      const { onRemove, onChange } = this.props;
      return (
        <ListCell
          key={i}
          value={ingredient}
          onRemove={onRemove}
          onChange={onChange}
          isIngredientCell
        />
      );
    });

  render() {
    const { availableIngr, onSubmit } = this.props;

    const previewListLength =
      availableIngr.length <= 10 ? 10 - availableIngr.length : 0;

    return (
      <div>
        <h6 className="title is-6">Machen wir mal ne Liste...</h6>
        <div className="list">
          {this.renderSummary(availableIngr)}
          {this.renderListStructure(previewListLength)}
        </div>
        <div className={flexStyle}>
          <button className="button is-link" onClick={onSubmit("explore")}>
            Entdecke Rezepte
          </button>
          <button className="button is-success" onClick={onSubmit("exact")}>
            Finde passende Rezepte
          </button>
        </div>
      </div>
    );
  }
}

export default IngedientsListComponent;
