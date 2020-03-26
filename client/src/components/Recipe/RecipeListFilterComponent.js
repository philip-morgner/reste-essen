import React from "react";
import classnames from "classnames";

class RecipeListFilterComponent extends React.PureComponent {
  renderButton = (value, onClick, isSelected, i) => (
    <p key={i} className="control">
      <button
        onClick={onClick(value)}
        className={classnames("button is-small", isSelected && "is-info")}>
        <span>{value}</span>
      </button>
    </p>
  );

  render() {
    const { onClick, filters, selected } = this.props;

    return (
      <div className="field has-addons">
        {filters.map((value, i) => {
          const isSelected = value === selected;
          return this.renderButton(value, onClick, isSelected, i);
        })}
      </div>
    );
  }
}

export default RecipeListFilterComponent;
