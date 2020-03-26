import React from "react";
import { Link } from "react-router-dom";
import { css } from "glamor";

import { t } from "../translationKeys";

const flexStyle = css({
  display: "flex",
  justifyContent: "center",
  "& button": {
    margin: "80px 20px",
  },
});

class Home extends React.PureComponent {
  render() {
    return (
      <div className={flexStyle}>
        <Link to="/find-recipe">
          <button className="button is-success is-large">{t("find")}</button>
        </Link>
        <Link to="/add-recipe">
          <button className="button is-info is-large">{t("add")}</button>
        </Link>
      </div>
    );
  }
}

export default Home;
