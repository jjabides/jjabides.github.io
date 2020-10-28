import React, { Component } from "react";
import Cartridge from "./cartridge";
import "../stylesheets/cartridges.css";
import sunburstDiagramIcon from "../images/Sunburst_Diagram_Icon.png";
import DALIcon from "../images/DAL_Diagram.svg";
import TrackAttackIcon from "../images/TrackAttack.png";
import SpotifyProjectIcon from "../images/Spotify_Search_Engine_Diagram.png";
import MeIcon from "../images/me.jpg";

class Cartridges extends Component {
  constructor() {
    super();

    this.setCartridgeData();
  }

  state = {
    cartridges: [],
  };

  render() {
    return (
      <div className={this.getClasses()}>
        {this.state.cartridges.map((cartridge) => (
          <Cartridge
            class="cartridge"
            selectGame={this.props.selectGame}
            selectedGame={this.props.game}
            key={cartridge.id}
            game={cartridge}
            id={"cartridge-" + cartridge.id}
          />
        ))}
      </div>
    );
  }

  getClasses = () => {
    var retVal = "cartridges-container";

    if (this.props.game) retVal += " selection-made";

    return retVal;
  };

  setCartridgeData = () => {
    var cartridges = [];

    for (var i = 0; i < 5; i++) {
      let cartridge = {
        icon: "",
        textIcon: "",
        id: i,
        title: "",
        description: "",
        links: [],
      };

      this.setCartridgeDetails(cartridge);

      cartridges.push(cartridge);
    }

    this.state.cartridges = cartridges;
  };

  setCartridgeDetails = (cartridge) => {
    switch (cartridge.id) {
      case 0:
        cartridge.icon = sunburstDiagramIcon;
        cartridge.title = "Sunburst Diagram Project";
        cartridge.description = (
          <div>
            This is a project I built at River Logic in the Summer of 2020. I was in charge of
            implementing designs for a radial graph that would represent
            customer Jobs usage, where Jobs are entities that run complex problems.
            <br />
            <br />
            Users would be able to manipulate the graph to highlight Job Units
            within a specific week or month. This web app would also calculate
            metrics such as used Job Units, averages, and remaining balance within
            a billing cycle.
            <br />
            <br />I wrote the front-end code in HTML, LESS, TypeScript,
            KnockoutJS, and SVG. I did all the data aggregation on the back-end using C#.
          </div>
        );
        break;
      case 1:
        cartridge.icon = DALIcon;
        cartridge.title = "Data Access Layer (DAL) Project";
        cartridge.description = (
          <div>
            This is a project I built at River Logic in the Summer of 2018. I was in charge of
            implementing a new layer in our system in which data is retrieved
            and cached (in memory and in browser cache).
            <br />
            <br />
            This class acted as an in-memory cache and can be accessed by any
            class in the system. If data requested from DAL doesn't exist, DAL would make an AJAX call to our back-end to
            retrieve the data, and later store it in memory.
            <br />
            <br />
            DAL would also listen for Pusher notifications to stay in sync with
            live updates and sends messages to Service Worker to update
            browser cache.
          </div>
        );
        cartridge.imageBackground = "white";
        break;
      case 2:
        cartridge.icon = TrackAttackIcon;
        cartridge.title = "Track Attack Video Game Project";
        cartridge.description = (
          <div>
            This is a project I built in my game development class at UW Bothell in the Spring of 2017. I worked in a team
            of four to build a small game within six weeks. We built a game called
            Track Attack - a 2D side-scroller that involves dynamic
            obstacle creation that varies depending on the pitch and noise of song that is playing.
            <br />
            <br />I was in charge UI, custom music, sound effects, and obstacle
            design. We used Unity for our game engine and wrote in C#
          </div>
        );
        cartridge.links = [
          {
            title: "Promo Video",
            link:
              "https://www.youtube.com/watch?v=73vEu0uQ9Zo&feature=youtu.be",
          },
          {
            title: "Download Link",
            link:
              "https://drive.google.com/file/d/0B8v_EAcotjiTSG1tbjVTVUlsNHc/view",
          },
          {
            title: "GitHub",
            link: "https://github.com/GregWright/CSS385MP4",
          },
        ];
        break;
      case 3:
        cartridge.icon = SpotifyProjectIcon;
        cartridge.title = "Spotify Search Engine Cloud Service";
        cartridge.description = (
          <div>
            This is a project I built in my Cloud Computing class at
            UW Bothell in the Winter of 2018. I worked in a team of two to build
            a cloud service that would utilize 6+ other cloud services. <br />
            <br /> We created a simple Spotify search engine that takes a search
            input for a song artist, utilizes Spotify's API to get a list of
            artists with the given search input. From there a user could select
            an artist and a list of tracks from the selected artist would
            appear. The user can then select a track and sample lyrics pulled
            from Musixmatch.com would display. <br />
            <br />
            For this project, we used Azure Web Apps, Blob Storage, Table
            Storage, Application Insights, Spotify API, and MusixMatch.
          </div>
        );
        cartridge.links = [
          {
            title: "GitHub",
            link: "https://github.com/jabides/CSS490-Final-Project",
          },
        ];
        cartridge.imageBackground = "white";
        break;
      case 4:
        cartridge.icon = MeIcon;
        cartridge.title = "About Me";
        cartridge.description = (
          <div>
            I'm JJ Abides, a software developer with 2+ years of experience
            working in the tech industry. I graduated from University of
            Washington Bothell in the Summer of 2018 with a Bachelor of Science in Computer Science
            and Software Engineering.
            <br />
            <br />
            So far I've worked with the following languages: JavaScript, HTML,
            CSS, TypeScript, Python, Java, C#, C++.
            <br />
            <br />
            I've also worked with the following tools, frameworks, and services:
            ReactJS, KnockoutJS, Unity, Visual Studio, Azure.
          </div>
        );
        cartridge.links = [
          {
            title: "LinkedIn",
            link: "https://www.linkedin.com/in/jjabides",
          },
          {
            title: "GitHub",
            link: "https://github.com/jjabides",
          },
          {
            title: "GitHub (old)",
            link: "https://github.com/jabides",
          },
          {
            title: "Email",
            link: "jj.abides@gmail.com",
          },
        ];
        break;
      default:
        break;
    }
  };
}

export default Cartridges;
