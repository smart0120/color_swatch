import React, { Component } from "react";
// import './App.css';
import {
  Button
} from 'reactstrap';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorList: [],
    };
  }

  getColors = () => {
    axios
      .post("/get_colors/")
      .then((res) => this.setState({ colorList: res.data }))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.getColors();
  }

  renderColors = () => {
    
    return (
      this.state.colorList.map((color, idx) => {
        const style = {
          width: "200px",
          height: "200px",
        }
        if (color.type === "rgb") {
          style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
        } else if (color.type === "hsl") {
          style.backgroundColor = `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`;
        }
        return <h5 key={idx} style={style} className="d-flex align-items-center justify-content-center font-weight-bold text-white">{color.type}({color.red || color.hue}, {color.green || color.saturation}, {color.blue || color.lightness})</h5>
      })
    );
  }

  render() {
    return (
      <div className="App p-5">
        <Button onClick={() => this.getColors()}>Generate colors</Button>
        <div className="d-flex mt-5">
          {this.renderColors()}
        </div>
      </div>
    );
  }
}

export default App;
