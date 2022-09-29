import { BrowserRouter, Route, Switch } from "react-router-dom";
import Question from "./components/Question";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/question">
            <Question />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
