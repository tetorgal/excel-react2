import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AdmAsistencia from "./components/pages/AdmAsistencia";
import Home from "./components/pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/asistencia" element={<AdmAsistencia />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
