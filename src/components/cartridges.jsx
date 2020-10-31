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
            customer Jobs usage, where Jobs are entities that run complex optimization problems for customers.
            <br />
            <br />
            Users would be able to manipulate the graph to highlight Job Units
            within a specific week or month. This tool would also calculate
            metrics such as used Job Units, averages, and remaining balance within
            a billing cycle.
            <br />
            <br />
            I approached this project using SVG and KnockoutJS as the key components behind building this graph. 
            I created a class called SunburstDiagramViewModel which would handle all the rendering. It contains a draw() function that draws every SVG in a specific order, using helper functions to contain each task.
            <br />
            <br />
            To draw each bar (sunray) I needed to accumulate customer job usage per week, then represent it in the graph with a length relative to the values of the Y-scale.
            I then needed to make an algorithm that would draw the position and length of the sunray within the SVG frame. The draw path formula looked something like this:
            <br />
            <div className="monospaced">
            {"M ${x - 4} ${y}"}
            <br />
            {"L ${x - 4} ${y - l}"}
            <br />
            {"A 4 4 0 0 1 ${x + 4} ${y - l}"}
            <br />
            {"L ${x + 4} ${y}"}
            <br />
            {"A 4 4 0 0 1 ${x - 4} ${y}"}
            </div>
            <br />
            Where 'x' and 'y' would be the placement of the sunray within the SVG frame and 'l' is the length of the sunray in pixels.
            To get the position of each ray, I needed to use a bit of trigonometry:
            <br />
            <div className="monospaced">
            {"var deg = i * degPerUnit * (Math.PI / 180);"}
            <br />
            {"var x = this.cx() + radius * Math.sin(deg);"}
            <br />
            {"var y = radius - radius * Math.cos(deg) + 220;"}
            </div>
            <br />
            'deg' is the number of degrees to rotate.
            <br />
            'i' is the index of the array that holds the weekly job unit accumulations.
            <br />
            'degPerUnit' is the number of degrees to rotate between each unit. It's converted into radians (Math.PI / 180) since the math library only takes radians for sin/cos.
            <br />
            <br />
            Knowing that sin(deg) = x/r and cos(deg) = y/r, I could derive the x position and y position if I know at least the number of degrees to rotate and radius length.
            <br />
            Note: 'this.cx()' and the number 220 are offsets from the left and top.
            <br />
            <br />
            Drawing the arcs (Y-scale) is achieved in a similar fashion, but using the SVG arc function:
            <br />
            <div className="monospaced">
            {"arcs.push(`M ${x1} ${y1} A ${arcRadius} ${arcRadius} 0 1 1 ${x2} ${y2}`);"}
            </div>
            In this case, I have to input the x and y values of where the arc ends. This changes based on how many weeks are in the current year, or if a user wants to view units by months instead.
            <br />
            <br />
            Each arc and sunray get pushed into a KnockoutObservableArray, where KnockoutJS handles the rendering for each of these elements.
            <br />
          </div>
        );
        break;
      case 1:
        cartridge.icon = DALIcon;
        cartridge.title = "Data Access Layer (DAL) Project";
        cartridge.description = (
          <div>
            This is a project I built at River Logic in the Summer of 2018. I was in charge of
            implementing a new tool in our system in which data is retrieved
            and cached (in memory and in browser cache).
            <br />
            <br />
            The Data Access Layer (DAL) is a class that acts as an in-memory cache and can be accessed by any
            module in the system. If data requested from DAL doesn't exist, DAL would make an AJAX call to our back-end to
            retrieve the data, and later store it in memory.
            <br />
            <br />
            DAL would also listen for Pusher notifications to stay in sync with
            live updates and sends messages to Service Worker to update
            client browser cache.
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
            <br />I was in charge or UI, custom music, sound effects, and obstacle
            design. We used Unity for our game engine and wrote in C#
            <br />
            <br />
            We used an open source fourier transforms library for C# to interpret the background music.
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
              "https://drive.google.com/file/d/1jnN2yKuC7CQgsLAKahJ4ogkLZ2n3FsAp/view?usp=sharing",
          },
          {
            title: "GitHub",
            link: "https://github.com/GregWright/TrackAttack",
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
            I'm currently employed at River Logic, where I primarily focus on front-end engineering.
            <br />
            <br />
            So far I've worked with the following languages: JavaScript, HTML,
            CSS, TypeScript, Python, Java, C#, C++.
            <br />
            <br />
            I've also worked with the following tools, frameworks, and services:
            ReactJS, KnockoutJS, Unity, Visual Studio, Azure.
            <br />
            <br />
            As for development interests, I'm interested in web development and game development.
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
