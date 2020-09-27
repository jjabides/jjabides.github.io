import React, { Component } from "react";
import "../stylesheets/gameboy.css";

class Gameboy extends Component {
  state = {
    animationState: 0,
    animationStateDurations: [0, 1600, 2000, 1000, 1000],
  };

  render() {
    return <div className={this.getClasses()}>{this.screenOnlyRender()}</div>;
  }

  screenOnlyRender = () => {
    if (this.state.animationState !== 4) return "";

    return (
      <div className="game-screen-cont">
        <div className="img-cont">
          <img className="game-images" src={this.props.game.icon} />
        </div>
        <div className="game-desc-cont">
          <div className="game-title">{this.props.game.title}</div>
          <div className="game-desc">{this.props.game.description}</div>
          <div className="links">{this.getLinks()}</div>
        </div>
      </div>
    );
  };

  getLinks = () => {
    if (!this.props.game.links) return;

    return this.props.game.links.map((link, index) => (
      <div className="link-cont" key={index}>
        <div className="link-title">{link.title}</div>
        <a className="link" href={link.link}>
          {link.link}
        </a>
      </div>
    ));
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
}

export default Gameboy;
