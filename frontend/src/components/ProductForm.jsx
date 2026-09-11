import { useState } from "react";
import { addProduct } from "../services/productService";

function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    minStock: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProduct({
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        minStock: Number(formData.minStock)
      });

      alert("Product added successfully!");

      setFormData({
        name: "",
        category: "",
        price: "",
        quantity: "",
        minStock: ""
      });

    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="product-form">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
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

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="0"
          required
        />

        <input
          type="number"
          name="minStock"
          placeholder="Minimum Stock"
          value={formData.minStock}
          onChange={handleChange}
          min="0"
          required
        />

        <button type="submit">
          Add Product
        </button>

      </form>
    </div>
  );
}

export default ProductForm;