import Navbar from "./components/Navbar";
import "./App.css";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

function App() {
  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Inventory Dashboard</h1>
      <ProductForm />
      <ProductList />
      </div>
    </>
  );
}

export default App;