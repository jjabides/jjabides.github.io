import React, { Component } from "react";
import "../stylesheets/gameboy.css";

class Gameboy extends Component {
  state = {
    animationState: 0,
    animationStateDurations: [0, 1600, 2000],
  };

  render() {
    return <div className={this.getClasses()}></div>;
  }

  getClasses = () => {
    var retVal = "gameboy";

    if (this.props.game && this.state.animationState === 0)
      this.startSelectedAnimation();

    switch (this.state.animationState) {
      case 1:
        retVal += " game-selected";
        break;
      case 2:
        console.log("zoom-in");
        retVal += " zoom-in";
        break;
      default:
        break;
    }

    return retVal;
  };

  startSelectedAnimation = () => {
    var runAnimation = () => {
      if (this.state.animationState < 2) {
        var animState = this.state.animationState;

        this.setState({ animationState: animState + 1 });

        setTimeout(
          runAnimation,
          this.state.animationStateDurations[animState + 1]
        );
      }
    };

    runAnimation();
  };
}

export default Gameboy;
