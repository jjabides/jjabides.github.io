import React, { Component } from "react";
import Cartridge from "./cartridge";
import "../stylesheets/cartridges.css";

class Cartridges extends Component {
  state = {
    cartridges: [
      { icon: "", id: 0 },
      { id: 1, icon: "" },
      { id: 2, icon: "" },
      { id: 3, icon: "" },
    ],
  };

  render() {
    return (
      <div className={this.getClasses()}>
        {this.state.cartridges.map((cartridge) => (
          <Cartridge
            class="cartridge"
            selectGame={this.props.selectGame}
            key={cartridge.id}
            id={"cartridge-" + cartridge.id}
          />
        ))}
      </div>
    );
  }

  getClasses = () => {
    var retVal = "cartridges-container";

    if (this.props.game) retVal += " selection-made";

    return retVal;
  };
}

export default Cartridges;
