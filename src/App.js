import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Question from "./components/Question";
import QuestionTest from "./components/QuestionTest";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Question />
          </Route>
          {/* <Route>
            <QuestionTest />
          </Route> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
