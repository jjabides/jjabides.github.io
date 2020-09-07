import React, { Component } from "react";
import Cartridge from "./cartridge";
import "./cartridges.css";

class Cartridges extends Component {
  state = {
    cartridges: [
      { icon: "", id: 0 },
      { id: 1, icon: "" },
      { id: 2, icon: "" },
    ],
  };

  render() {
    return (
      <div className="cartridges-container">
        {this.state.cartridges.map((cartridge) => (
          <Cartridge key={cartridge.id} id={"cartridge-" + cartridge.id} />
        ))}
      </div>
    );
  }
}

export default Cartridges;
