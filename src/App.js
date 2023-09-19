import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ListaSvinja from "./Components/ListaSvinja/ListaSvinja";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ListaSvinja />} />
      </Routes>
    </>
  );
}

export default App;
