import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import {
  getProducts,
  createProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
} from "../ApiManager/Product";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();

      setProducts(res);
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
      const res = await createProduct(product);

      setProducts([...products, res]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (id, product) => {
    try {
      const res = await apiUpdateProduct(id, product);
      setProducts(
        products.map((p) =>
          p._id === id ? res : p
        )
      );

      setSelectedProduct(null);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await apiDeleteProduct(id);
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