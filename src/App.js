import React, { Component } from "react";
import "./styles.scss";
import axios from "axios";
import smiley from "./images/smiley.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showedImage: "https://media.giphy.com/media/dQpJiKMVIRueI/giphy.gif",
      searchText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  handleSubmit(event) {
    const apiKey = "xst5VvzzIp6CbZUlUA0ZH49ChLBXdnJv&limit=1";

    axios
      .get(
        "http://api.giphy.com/v1/gifs/search?q=" +
          this.state.searchText +
          "&api_key=" +
          apiKey +
          '"'
      )
      .then(res => {
        const image = res.data;
        this.setState({ showedImage: image.data[0].images.original.url });
        console.log(this.state.showedImage);
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <section className="content">
          <header className="header">
            <div className="header__image">
              <img src={smiley} alt="Smiley face" />
            </div>
            <h1 className="header__title">WATYOUWANTUSEE</h1>
            <p>
              Just a funny app to see a different gif according to what you
              would like to see today. Have fun!
            </p>
          </header>
          <form onSubmit={this.handleSubmit}>
            <h2>Whatever you want to see...</h2>
            <input
              type="text"
              className="input"
              value={this.state.searchText}
              onChange={this.handleChange}
            />
            <input type="submit" className="button" value="Go!" />
          </form>
          <div className="result">
            <img src={this.state.showedImage} alt="search" />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
