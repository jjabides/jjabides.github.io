import React, { Component } from "react";
import "./stylesheets/App.css";
import Cartridges from "./components/cartridges";
import Gameboy from "./components/gameboy";

class App extends Component {
  state = {
    textSequenceState: 0,
    sequenceStateDurations: [0, 2000, 4000, 1600],
    selectedGame: null,
  };

  constructor() {
    super();
  }

  render() {
    return (
      <div
        className="container"
        onClick={() =>
          this.incrementSequenceState(this.state.textSequenceState + 1)
        }
      >
        {this.getIntroText()}
        <div className="main-content">{this.displayMainContent()}</div>
      </div>
    );
  }

  componentDidMount() {
    if (this.state.textSequenceState === 0) {
      this.startTextSequence();
    }
  }

  getIntroText = () => {
    switch (this.state.textSequenceState) {
      case 1:
        return <div className="hello-splash floating-text">Hello! :)</div>;
      case 2:
        return (
          <div className="introduction-desc floating-text">
            Welcome to my web portfolio!
            <br />
            My name is JJ Abides. I'm a software developer with 2+ years of
            experience.
          </div>
        );
      default:
        return (
          <div className="selection-text floating-text">
            Please select a cartridge
          </div>
        );
    }
  };

  startTextSequence = () => {
    this.incrementSequenceState(1);
  };

  incrementSequenceState = (state) => {
    var numOfStates = this.state.sequenceStateDurations.length;
    if (this.state.textSequenceState >= state || state > numOfStates) return;

    var duration = this.state.sequenceStateDurations[state];

    this.setState({ textSequenceState: state });

    if (state < numOfStates)
      setTimeout(() => {
        this.incrementSequenceState(state + 1);
      }, duration);
  };

  displayMainContent = () => {
    if (this.state.textSequenceState > 3)
      return (
        <div className="main-content-cont">
          <Gameboy game={this.state.selectedGame} />
          <Cartridges selectGame={this.handleSelectGame} />
        </div>
      );
  };

  handleSelectGame = (name) => {
    console.log("hit", name);
    this.setState({ selectedGame: name });
  };
}

export default App;
