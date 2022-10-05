import { BrowserRouter, Route, Switch } from "react-router-dom";
import QuestionTest from "./components/QuestionTest";
import Home from "./components/Home";
import View from "./components/View";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/question-test">
            <QuestionTest />
          </Route>
          <Route path="/view-answer">
            <View />
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
