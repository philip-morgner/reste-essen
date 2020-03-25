import React from "react";
import { css, media } from "glamor";

import { init } from "../translationKeys";
import { titleStyle } from "../styles";

import german from "../../country_flags/Flag_of_Germany.svg";
import english from "../../country_flags/Flag_of_the_United_States_and_United_Kingdom.png";
import spanish from "../../country_flags/Flag_of_Spain.svg";
import italian from "../../country_flags/Flag_of_Italy.svg";

const imgStyle = css(
  {
    display: "flex",
    justifyContent: "space-evenly",
    margin: "auto",
    "& img": {
      height: 100,
      width: 160,
      boxShadow: "2px 2px 2px 2px #E8E8E8",
      ":hover": {
        height: 125,
        width: 200,
        boxShadow: "5px 5px 5px 5px #E8E8E8",
        cursor: "pointer",
      },
    },
  },
  media("(max-width: 800px)", {
    flexDirection: "column",
    alignItems: "center",
    "& img": { marginBottom: 30 },
  })
);

class Init extends React.PureComponent {
  handleClick = lang => () => {
    init(lang);
    this.props.history.push("/home");
  };

  render() {
    return [
      <div className={titleStyle}>
        <h3 className="subtitle is-3">Choose your Language</h3>
      </div>,
      <div className={imgStyle}>
        <img src={german} alt="Deutsch" onClick={this.handleClick("de")} />
        <img src={english} alt="English" onClick={this.handleClick("en")} />
        <img src={spanish} alt="Español" onClick={this.handleClick("es")} />
        <img src={italian} alt="Italian" onClick={this.handleClick("it")} />
      </div>,
    ];
  }
}

export default Init;
