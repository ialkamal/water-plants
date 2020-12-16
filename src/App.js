import "./App.css";
import { Route, Switch } from "react-router-dom";
import LogIn from "./components/LogIn";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <h1>Welcome to Water My Plants App</h1>
      <Navbar />
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
