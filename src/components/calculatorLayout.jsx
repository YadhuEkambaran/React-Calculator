import React, { Component } from "react";
import Box from "./box";

class CalculatorLayout extends Component {
  state = {
    values: ["C", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "*", "/", "+", "-", "="],
    leftValue: null,
    rightValue: null,
    operation: null,
    result: 0,
  };

  render() {
    return (
      <div>
        <h1 key="c_header">Calculators</h1>
        <div key="c_values">{this.generateBoxes()}</div>
        <div key="c_result">{"Result = " + this.state.result}</div>
      </div>
    );
  }

  generateBoxes() {
    const boxes = [];
    let i = 1;
    this.state.values.forEach((element) => {
      boxes.push(
        <Box
          key={element}
          value={element}
          onClick={() => {
            this.handleClick(element);
          }}
        ></Box>
      );
      if (i % 3 == 0) {
        boxes.push(<div key={"index_" + i}></div>);
      }
      i += 1;
    });
    return boxes;
  }

  getResult() {
    if (
      !(this.state.leftValue && this.state.operation && this.state.rightValue)
    ) {
      this.state.result = 0;
    } else {
      if (this.state.operation == "+") {
        this.state.result =
          parseInt(this.state.leftValue) + parseInt(this.state.rightValue);
      } else if (this.state.operation == "-") {
        this.state.result =
          parseInt(this.state.leftValue) - parseInt(this.state.rightValue);
      } else if (this.state.operation == "*") {
        this.state.result =
          parseInt(this.state.leftValue) * parseInt(this.state.rightValue);
      } else if (this.state.operation == "/") {
        this.state.result =
          parseInt(this.state.leftValue) / parseInt(this.state.rightValue);
      }

      this.setState(this.state);

      console.log("------- LEFT      ----- " + this.state.leftValue);
      console.log("------- OPERATION ----- " + this.state.operation);
      console.log("------- RIGHT     ----- " + this.state.rightValue);
      console.log("------- RESULT    ----- " + this.state.result);

      this.resetValues();
    }
  }

  handleClick(value) {
    if (isNaN(value)) {
      if (value == "=") {
        this.getResult();
      } else if (value == "C") {
        this.reset();
      } else {
        this.state.operation = value;
      }
    } else {
      if (this.state.leftValue) {
        this.state.rightValue = value;
      } else {
        this.reset();
        this.state.leftValue = value;
      }
    }
  }

  reset() {
    this.resetValues();
    this.state.result = 0;
    this.setState(this.state);
  }

  resetValues() {
    this.state.leftValue = null;
    this.state.rightValue = null;
    this.state.operation = null;
  }
}

export default CalculatorLayout;
