import React, { Component } from "react";
import Box from "./box";

class CalculatorLayout extends Component {
  state = {
    values: ["C", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "*", "/", "+", "-"],
    leftValue: null,
    rightValue: null,
    operation: null,
    result: 0,
  };

  render() {
    return (
      <div className="main-container">
        <h1 key="c_header" className="c-header">
          Calculators
        </h1>
        <div key="c_result" className="c-result">
          <Box value={this.state.result} className="box-result"></Box>
        </div>
        <div key="c_values" className="box-container">
          {this.generateBoxes()}
        </div>
        <div key="c_equal" className="c-equal">
          <Box
            onClick={() => {
              this.handleClick("=");
            }}
            value="="
          ></Box>
        </div>
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
    let tempResult;
    if (
      !(this.state.leftValue && this.state.operation && this.state.rightValue)
    ) {
      tempResult = 0;
    } else {
      if (this.state.operation == "+") {
        tempResult =
          parseInt(this.state.leftValue) + parseInt(this.state.rightValue);
      } else if (this.state.operation == "-") {
        tempResult =
          parseInt(this.state.leftValue) - parseInt(this.state.rightValue);
      } else if (this.state.operation == "*") {
        tempResult =
          parseInt(this.state.leftValue) * parseInt(this.state.rightValue);
      } else if (this.state.operation == "/") {
        tempResult =
          parseInt(this.state.leftValue) / parseInt(this.state.rightValue);
      }

      this.setState({ result: tempResult });

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
        this.setState({ operation: value });
      }
    } else {
      if (this.state.leftValue) {
        this.setState({ rightValue: value });
      } else {
        this.reset();
        this.setState({ leftValue: value });
      }
    }
  }

  reset() {
    this.resetValues();
    this.setState({ result: 0 });
  }

  resetValues() {
    this.setState({
      leftValue: null,
      rightValue: null,
      operation: null,
    });
  }
}

export default CalculatorLayout;
