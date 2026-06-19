import Navbar from "./sharedcomp/NavBar";
import Footer from "./sharedcomp/Footer";
import ProductPage from "./Pages/ProductPage";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <ProductPage />
      </main>

      <Footer />
    </>
  );
}

export default App;