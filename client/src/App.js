import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AdmAsistencia from "./components/pages/AdmAsistencia";
import Home from "./components/pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/asistencia" element={<AdmAsistencia />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
