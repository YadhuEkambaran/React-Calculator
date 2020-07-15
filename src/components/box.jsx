import React, { Component } from "react";

class Box extends Component {
  render() {
    return <button onClick={this.props.onClick}>{this.props.value}</button>;
  }
}

export default Box;
