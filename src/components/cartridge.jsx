import React, { Component } from "react";
import "./cartridge.css";

class Cartridge extends Component {
  state = {
    selected: false,
    animationState: 0,
    animationDurations: [0, 0, 700, 200, 400],
  };

  render() {
    return (
      <div className="cartridge-container">
        <div
          id={this.props.id}
          style={this.getStyles()}
          className={this.getClasses()}
          onClick={this.handleOnClick}
        ></div>
        <div className="place-holder"></div>
      </div>
    );
  }

  getStyles = () => {
    var state = this.state.animationState;
    if (state === 1) {
      return {
        top: this.getTopRelativeToMain() + "px",
        left: this.getLeftRelativeToMain() + "px",
      };
    } else if (state === 2) {
      return {
        top: "calc(50% - 256px)",
        left: "calc(50% - 64px)",
      };
    } else if (state === 3) {
      return {
        top: "calc(50% - 128px)",
        left: "calc(50% - 64px)",
        transition: "all .2s ease-out",
      };
    } else if (state >= 4) {
      return {
        top: "calc(50% - 192px)",
        left: "calc(50% - 64px)",
        transition: "all .4s ease",
      };
    }
  };

  getClasses = () => {
    var retVal = "cartridge";

    if (this.state.selected) retVal += " selected";

    return retVal;
  };

  handleOnClick = () => {
    this.setState({ selected: true });
    this.startSelectedAnimation();
  };

  getTopRelativeToMain = () => {
    var mainOffset = document
      .getElementsByClassName("main-content")[0]
      .getBoundingClientRect().top;
    var cartridgeTop = document
      .getElementById(this.props.id)
      .getBoundingClientRect().top;

    return cartridgeTop - mainOffset;
  };

  getLeftRelativeToMain = () => {
    var mainOffset = document
      .getElementsByClassName("main-content")[0]
      .getBoundingClientRect().left;

    var cartridgeLeft = document
      .getElementById(this.props.id)
      .getBoundingClientRect().left;

    return cartridgeLeft - mainOffset;
  };

  startSelectedAnimation = () => {
    var setAnimationState = () => {
      var state = this.state.animationState;
      if (state >= this.state.animationDurations.length) return;

      this.setState({ animationState: state + 1 });

      setTimeout(setAnimationState, this.state.animationDurations[state + 1]);
    };

    setAnimationState();
  };
}

export default Cartridge;
