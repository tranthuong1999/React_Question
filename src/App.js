import { BrowserRouter, Route, Switch } from "react-router-dom";
import QuestionTest from "./components/QuestionTest";
import Home from "./components/Home";
import ViewTest from "./components/ViewTest";
import Question from "./components/Question";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/question-test">
            <QuestionTest />
          </Route>
          <Route path="/question">
            <Question />
          </Route>
          <Route path="/view-answer">
            <ViewTest />
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
