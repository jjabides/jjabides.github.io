import React, { Component } from "react";
import "../stylesheets/gameboy.css";
import GameboyScreen from "./gameboyScreen";

class Gameboy extends Component {
  state = {
    animationState: 0,
    animationStateDurations: [0, 1600, 1600, 600, 1000],
  };

  render() {
    return <div className={this.getClasses()}>{this.screenOnlyRender()}</div>;
  }

  screenOnlyRender = () => {
    if (this.state.animationState !== 4) return "";

    return (
      <GameboyScreen navigateBack={this.navigateBack} game={this.props.game} />
    );
  };

  getClasses = () => {
    var retVal = "gameboy";

    if (this.props.game && this.state.animationState === 0)
      this.startSelectedAnimation();

    switch (this.state.animationState) {
      case 1:
        retVal += " game-selected";
        break;
      case 2:
        retVal += " zoom-in";
        break;
      case 3:
        retVal = "screen-only";
        break;
      case 4:
        retVal = "screen-only";
        break;
      default:
        break;
    }

    return retVal;
  };

  startSelectedAnimation = () => {
    var runAnimation = (state) => {
      if (
        state > this.state.animationState &&
        state < this.state.animationStateDurations.length
      ) {
        this.setState({ animationState: state });

        setTimeout(
          () => runAnimation(state + 1),
          this.state.animationStateDurations[state]
        );
      }
    };

    setTimeout(() => {
      runAnimation(1);
    }, 0);
  };

  navigateBack = () => {
    this.props.unselectGame();
    this.setState({ animationState: 0 });
  };
}

export default Gameboy;
