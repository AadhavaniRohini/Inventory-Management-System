import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  updateProduct
} from "../services/productService";

function ProductList() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      alert("Product deleted successfully!");

      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  // Edit product
  const handleEdit = async (product) => {
    const name = prompt("Enter product name:", product.name);
    const category = prompt("Enter category:", product.category);
    const price = prompt("Enter price:", product.price);
    const quantity = prompt("Enter quantity:", product.quantity);
    const minStock = prompt("Enter minimum stock:", product.minStock);

    if (
      name === null ||
      category === null ||
      price === null ||
      quantity === null ||
      minStock === null
    ) {
      return;
    }

    try {
      await updateProduct(product._id, {
        name,
        category,
        price: Number(price),
        quantity: Number(quantity),
        minStock: Number(minStock)
      });

      alert("Product updated successfully!");

      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="product-list">
      <h2>Products</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Minimum Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.minStock}</td>

              <td>
                <button onClick={() => handleEdit(product)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;