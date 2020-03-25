import React from "react";
import { css } from "glamor";
import { t } from "../translationKeys";
import { Link } from "react-router-dom";

const flexStyle = css({
  display: "flex",
  justifyContent: "center",
  "& button": {
    // width: 150,
    margin: "80px 20px",
  },
});

class App extends React.Component {
  handleClickFind = () => console.log("find");
  handleClickAdd = () => console.log("add");

  render() {
    return (
      <div className={flexStyle}>
        <Link to="/find-recipe">
          <button
            onClick={this.handleClickFind}
            className="button is-success is-large">
            {t("find")}
          </button>
        </Link>
        <Link to="/add-recipe">
          <button
            onClick={this.handleClickAdd}
            className="button is-info is-large">
            {t("add")}
          </button>
        </Link>
      </div>
    );
  }
}

export default App;
