import React, { Component } from "react";
import "../stylesheets/gameboy.css";
import GameboyScreen from "./gameboyScreen";

class Gameboy extends Component {
  state = {
    animationState: 0,
    animationStateDurations: [0, 1600, 1600, 2000, 1000],
  };

  render() {
    return <div className={this.getClasses()}>{this.screenOnlyRender()}</div>;
  }

  screenOnlyRender = () => {
    if (this.state.animationState < 3) return (
      <svg viewBox="0 0 256 128" width="100%" height="100%">
        <rect className="screen" x="46" y="18" width="164" height="92" fill="black"></rect>
        <g className="cross-pad">
          <rect x="12" y="60" width="24" height="8" fill="black"></rect>
          <rect x="20" y="52" width="8" height="24" fill="black"></rect>
        </g>
        <g className="buttons">
          <circle cx="232" cy="56" r="4" fill="black"></circle>
          <circle cx="232" cy="72" r="4" fill="black"></circle>
          <circle cx="224" cy="64" r="4" fill="black"></circle>
          <circle cx="240" cy="64" r="4" fill="black"></circle>
        </g>
      </svg>
    );

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
