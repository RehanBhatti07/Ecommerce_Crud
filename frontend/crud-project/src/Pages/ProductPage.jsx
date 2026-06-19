import { useEffect, useState } from "react";
import API from "../ApiManager/Api";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/");

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    try {
      const res = await API.post("/", product);

      setProducts([...products, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (id, product) => {
    try {
      const res = await API.put(`/${id}`, product);

      setProducts(
        products.map((p) =>
          p._id === id ? res.data : p
        )
      );

      setSelectedProduct(null);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/${id}`);

      setProducts(
        products.filter((p) => p._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">

      <h1>MERN CRUD Dashboard</h1>

      <ProductForm
        addProduct={addProduct}
        selectedProduct={selectedProduct}
        updateProduct={updateProduct}
      />

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <ProductTable
          products={products}
          deleteProduct={deleteProduct}
          editProduct={setSelectedProduct}
        />
      )}
    </div>
  );
};

export default ProductPage;