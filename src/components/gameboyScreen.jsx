import React, { Component } from "react";

class GameboyScreen extends Component {
  render() {
    return (
      <div className={this.getClassNames()}>
        <div className="back-btn" onClick={this.props.navigateBack}>
          BACK
        </div>
        <div className="img-cont">
          <img
            className="game-images"
            src={this.props.game.icon}
            style={this.getImageBackground()}
          />
        </div>
        <div className={this.getDescContClassNames()}>
          <div className="game-title">{this.props.game.title}</div>
          <div className="game-desc">{this.props.game.description}</div>
          <div className="links">{this.getLinks()}</div>
        </div>
      </div>
    );
  }

  getClassNames = () => {
    var retVal = "game-screen-cont";

    if (this.props.game.title.toLowerCase() === "about me")
      retVal += " about-me";

    return retVal;
  };

  getDescContClassNames = () => {
    var retVal = "game-desc-cont";

    if (!this.props.game.links || this.props.game.links.length === 0)
      retVal += " no-links";

    return retVal;
  }

  getImageBackground = () => {
    return this.props.game.imageBackground
      ? { backgroundColor: this.props.game.imageBackground }
      : { backgroundColor: "transparent" };
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
}

export default GameboyScreen;
