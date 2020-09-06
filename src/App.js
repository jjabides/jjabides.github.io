import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    textSequenceState: 0,
    sequenceStateDurations: [0, 2000, 4000],
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
        return <div id="hello-splash">Hello! :)</div>;
      case 2:
        return (
          <div className="introduction-desc">
            My name is JJ Abides. I'm a software developer with 2+ years of
            front-end experience.
          </div>
        );
      default:
        break;
    }
  };

  startTextSequence = () => {
    this.incrementSequenceState(1);
  };

  incrementSequenceState = (state) => {
    if (this.state.textSequenceState >= state) return;

    var duration = this.state.sequenceStateDurations[state];

    this.setState({ textSequenceState: state });

    var numOfStates = this.state.sequenceStateDurations.length;

    if (state < numOfStates)
      setTimeout(() => {
        this.incrementSequenceState(state + 1);
      }, duration);
  };
}

export default App;
