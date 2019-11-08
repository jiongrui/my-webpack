import React from "react";
import ReactDom from "react-dom";
import "./index.less";
import logo from "./images/logo.png";
import "../../common/common";

class App extends React.Component {
  render() {
    return (
      <div class="text">
        who are you??? lai na ne ?！
        <img src={logo} />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));
