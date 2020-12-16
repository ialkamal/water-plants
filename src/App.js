import "./App.css";
import { Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <h1>Welcome to Water My Plants App</h1>
      <Navbar />
      <Route path="/" component={LogIn} />
      <Route path="/signup" component={SignUp} />
    </div>
  );
}

export default App;
