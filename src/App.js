import "./App.css";
import { Route, Switch, NavLink } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Plants from "./protected/Plants";
import UserProfile from "./protected/UserProfile";
import LogIn from "./components/LogIn";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <h1>
        <NavLink to="/plants">Welcome to Water My Plants App</NavLink>
      </h1>
      <Navbar />
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/plants" component={Plants} />
        <PrivateRoute path="/profile" component={UserProfile} />
      </Switch>
    </div>
  );
}

export default App;
