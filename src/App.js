import React, { Component } from "react";
import "./App.css";
const { nextGeneration, returnGrid } = require("./gameOfLife");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounds: { topLeft: [0, 0], bottomRight: [30, 70] },
      generation: [],
      Grid: []
    };
  }

  createInitialGrid() {
    return new Array(30).fill(new Array(70).fill(" "));
  }

  addToGeneration(element) {
    this.state.generation.push(element);
  }

  placeLiveCell(e) {
    let element = e.target;
    element.style.backgroundColor = "black";
    this.addToGeneration(JSON.parse(element.id));
  }

  createTableColumn(id, column, index) {
    let column_id = `[${id},${index}]`;
    return (
      <TableColumn
        id={column_id}
        key={index}
        value={column}
        onClick={this.placeLiveCell.bind(this)}
      />
    );
  }

  createTableRow(row, index) {
    return (
      <TableRow
        id={index}
        key={index}
        value={row.map(this.createTableColumn.bind(this, index))}
      />
    );
  }

  createTable() {
    let initialGrid = this.createInitialGrid();
    let grid = initialGrid.map(this.createTableRow.bind(this));
    return grid;
  }

  resetGrid() {
    let columns = document.getElementsByTagName("td");
    for (let i = 0; i < columns.length; i++) {
      columns[i].style.backgroundColor = "#B3A8A6";
    }
  }

  renderGeneration() {
    this.resetGrid();
    let grid = returnGrid(this.state.generation, this.state.bounds);
    let currentGeneration = nextGeneration(
      this.state.generation,
      this.state.bounds
    );

    this.setState({
      grid: grid,
      generation: currentGeneration
    });

    currentGeneration.forEach(element => {
      let liveCell = document.getElementById(JSON.stringify(element));
      liveCell.style.backgroundColor = "black";
    });
    return;
  }

  renderGrid() {
    return this.state.grid.map(this.createTableRow.bind(this));
  }

  startGame() {
    setInterval(this.renderGeneration.bind(this), 500);
  }

  restartGame() {
    window.location.reload();
  }

  render() {
    return (
      <div className="container">
        <div className="caption">GAME OF LIFE</div>
        <div className="App">
          <table className="gol-grid" id="gol-grid">
            <tbody>{this.createTable()}</tbody>
          </table>
          <div className="button">
            <button onClick={this.startGame.bind(this)}>Start Game</button>
            <button onClick={this.restartGame.bind(this)}>Restart Game</button>
          </div>
        </div>
      </div>
    );
  }
}

class TableRow extends Component {
  render() {
    return <tr id={this.props.id}>{this.props.value}</tr>;
  }
}

class TableColumn extends Component {
  render() {
    return (
      <td id={this.props.id} onClick={this.props.onClick}>
        {this.props.value}
      </td>
    );
  }
}
export default App;
