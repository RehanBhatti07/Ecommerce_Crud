import Navbar from "./sharedcomp/NavBar";
import Footer from "./sharedcomp/Footer";
import ProductPage from "./Pages/ProductPage";
import { Routes, Route } from "react-router-dom";
import Auth from "./sharedcomp/authComp"
import Dashboard from "./components/dashboard";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

       <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;