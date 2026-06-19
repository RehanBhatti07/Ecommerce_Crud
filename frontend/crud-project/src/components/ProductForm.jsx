import { useState, useEffect } from "react";

const ProductForm = ({ addProduct, selectedProduct, updateProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: ""
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedProduct) {
      updateProduct(selectedProduct._id, formData);
    } else {
      addProduct(formData);
    }

    setFormData({
      name: "",
      price: "",
      category: ""
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {selectedProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;