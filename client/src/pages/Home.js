import React from "react";
import { Link } from "react-router-dom";

import { flexStyleWithButton as flexStyle } from "../styles";

class Home extends React.PureComponent {
  render() {
    return (
      <div className={flexStyle}>
        <Link to="/find-recipe">
          <button className="button is-success is-large">Rezepte finden</button>
        </Link>
        <Link to="/add-recipe">
          <button className="button is-info is-large">
            Rezepte hinzufügen
          </button>
        </Link>
      </div>
    );
  }
}

export default Home;
