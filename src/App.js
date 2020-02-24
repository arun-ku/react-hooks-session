import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WithoutHooksMain from "./components/without-hooks/main";
import WithHooksMain from "./components/with-hooks/main";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <div>
          <div>
            <Link to="/without-hooks/main">Without Hooks</Link>
            <br/>
            <Link to="/with-hooks/main">With Hooks</Link>
          </div>
          <Route path="/without-hooks/main" component={WithoutHooksMain} />
          <Route path="/with-hooks/main" component={WithHooksMain} />
        </div>
      </Router>
    </div>
  );
}

export default App;
