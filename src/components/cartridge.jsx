import React, { Component } from "react";
import "../stylesheets/cartridge.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "../stylesheets/customTippyStyles.css";
import "tippy.js/animations/shift-away.css";

class Cartridge extends Component {
  constructor(props) {
    super();

    this.game = props.game;
  }
  game = {};

  cartridgeHeight = 128;

  state = {
    selected: false,
    animationState: 0,
    animationDurations: [0, 0, 700, 200, 400],
  };

  render() {
    return (
      <div className="cartridge-container">
        <Tippy
          content={this.game.title}
          placement="bottom"
          disabled={this.state.selected}
          duration={[700, 500]}
          animation="shift-away"
          zIndex="100"
        >
          <div
            id={this.props.id}
            style={this.getStyles()}
            className={this.getClasses()}
            onClick={this.handleOnClick}
          >
            <img className="cartridge-icon" src={this.game.icon} />
          </div>
        </Tippy>

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
        top: `calc(50% - ${this.cartridgeHeight * 2}px)`,
        left: `calc(50% - ${this.cartridgeHeight / 2}px)`,
      };
    } else if (state === 3) {
      return {
        top: `calc(50% - ${this.cartridgeHeight / 4}px)`,
        left: `calc(50% - ${this.cartridgeHeight / 2}px)`,
        transition: "all .2s ease-out",
      };
    } else if (state >= 4) {
      return {
        top: `calc(50% - ${this.cartridgeHeight / 1.5}px)`,
        left: `calc(50% - ${this.cartridgeHeight / 2}px)`,
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
    this.props.selectGame(this.game);
    this.startSelectedAnimation();
  };

  getTopRelativeToMain = () => {
    var mainOffset = document
      .getElementsByClassName("main-content")[0]
      .getBoundingClientRect().top;

    var cartridgeTop = document
      .getElementById(this.props.id)
      .getBoundingClientRect().top;

    this.cartridgeHeight = document.getElementById(
      this.props.id
    ).parentElement.clientHeight;

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

  static getDerivedStateFromProps(props, state) {
    if (
      !props.selectedGame &&
      state.selected &&
      state.animationState >= state.animationDurations.length
    ) {
      return {
        selected: false,
        animationState: 0,
      };
    }

    return state;
  }
}

export default Cartridge;
