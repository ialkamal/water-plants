import "./App.css";
import { Route, Switch, NavLink } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Plants from "./protected/Plants";
import PlantDetails from "./protected/PlantDetails";
import AddPlant from "./protected/AddPlant";
import UserProfile from "./protected/UserProfile";
import EditProfile from "./protected/EditProfile";
import LogIn from "./components/LogIn";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import EditPlant from "./protected/EditPlant";

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
        <PrivateRoute exact path="/plants" component={Plants} />
        <PrivateRoute exact path="/plants/add" component={AddPlant} />
        <PrivateRoute exact path="/plants/:id" component={PlantDetails} />
        <PrivateRoute exact path="/plants/:id/edit" component={EditPlant} />
        <PrivateRoute exact path="/profile" component={UserProfile} />
        <PrivateRoute exact path="/profile/edit" component={EditProfile} />
      </Switch>
    </div>
  );
}

export default App;
