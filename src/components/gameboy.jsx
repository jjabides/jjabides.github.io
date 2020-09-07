import React, { Component } from "react";
import "../stylesheets/gameboy.css";

class Gameboy extends Component {
  render() {
    return <div className={this.getClasses()}></div>;
  }

  getClasses = () => {
    var retVal = "gameboy";
    if (this.props.game) retVal += " game-selected";

    return retVal;
  };
}

export default Gameboy;
