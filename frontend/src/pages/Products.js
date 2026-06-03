import { useEffect, useState } from "react";
import API from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: ""
  });

  const loadProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    await API.post("/products", {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity)
    });

    setForm({ name: "", sku: "", price: "", quantity: "" });
    loadProducts();
  };

  return (
    <div>
      <h2>Products</h2>

      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="sku" placeholder="SKU" value={form.sku} onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input name="quantity" placeholder="Quantity" onChange={handleChange} />

      <button onClick={addProduct}>Add Product</button>

      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - {p.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;