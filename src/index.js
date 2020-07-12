import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// import {} from "./components";

const App = () => {
  // const [] = useState([]);

  return (
    <Router>
      <div>
        <nav>
          <h1>Hello World</h1>
        </nav>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
