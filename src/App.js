import React, { Component } from "react";
import "./App.css";
const { nextGeneration, returnGrid } = require("./gameOfLife");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGeneration: [[0, 1], [1, 1], [2, 1]],
      bounds: { topLeft: [0, 0], bottomRight: [2, 2] },
      grid: []
    };
  }

  renderNextGeneration() {
    let result = returnGrid(this.state.currentGeneration, this.state.bounds);
    let currentGeneration = nextGeneration(
      this.state.currentGeneration,
      this.state.bounds
    );
    this.setState({ grid: result, currentGeneration: currentGeneration });
    return;
  }

  componentDidMount() {
    setInterval(this.renderNextGeneration.bind(this), 500);
  }

  renderGrid() {
   return this.state.grid.map(function(result, index) {
      return (
        <TableRow
          key={index}
          value={result.map(function(cell, index) {
            return <TableColumn key={index} value={cell} />;
          })}
        />
      );
    })
  }
  render() {
    return (
      <div className="App">
        <table className="grid">
          <tbody>
            {this.renderGrid()}      
          </tbody>
        </table>
      </div>
    );
  }
}

class TableRow extends Component {
  render() {
    return <tr>{this.props.value}</tr>;
  }
}

class TableColumn extends Component {
  render() {
    return <td>{this.props.value}</td>;
  }
}
export default App;
