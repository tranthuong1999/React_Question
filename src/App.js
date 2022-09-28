import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Question from "./components/Question";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Question />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
