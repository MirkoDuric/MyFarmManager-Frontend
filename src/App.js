import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ListaSvinja from "./Components/ListaSvinja/ListaSvinja";
import Homepage from "./Components/Homepage/Homepage";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Logedinpage from "./Components/Logedinpage/Logedinpage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logedinpage" element={<Logedinpage />} />
        <Route path="/ListaSvinja" element={<ListaSvinja />} />
      </Routes>
    </>
  );
}

export default App;
