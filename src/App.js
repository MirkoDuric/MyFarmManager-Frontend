import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ListaSvinja from "./Components/ListaSvinja/ListaSvinja";
import Landingpage from "./Components/Landingpage/Landingpage";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Homepage from "./Components/Homepage/Homepage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/listaSvinja" element={<ListaSvinja />} />
      </Routes>
    </>
  );
}

export default App;
