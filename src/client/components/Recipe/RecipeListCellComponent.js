import React from "react";
import { isNil } from "ramda";
import classnames from "classnames";
import { css } from "glamor";
import { t } from "../../translationKeys";

const cellStyle = css({
  width: "30vw",
  cursor: "pointer",
  ":hover": { backgroundColor: "#EEEEEE" },
});

const adjustHeight = css({
  fontSize: "2.5em",
});

class ListCellComponent extends React.Component {
  state = {};

  render() {
    const { isEmpty, value, onRemove } = this.props;
    console.log("ListCellComponent -> render -> value", value);
    const hasRemove = !isNil(onRemove);

    return (
      <div
        className={classnames(
          "list-item",
          `${cellStyle}`,
          isEmpty && `${adjustHeight}`
        )}>
        {!isEmpty && value}
        {hasRemove && (
          <button
            className="delete is-pulled-right"
            onClick={onRemove(value)}></button>
        )}
      </div>
    );
  }
}

export default ListCellComponent;
