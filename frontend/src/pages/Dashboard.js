import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const productsRes = await API.get("/products");
      const customersRes = await API.get("/customers");
      const ordersRes = await API.get("/orders");

      setProducts(productsRes.data);
      setCustomers(customersRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const lowStockProducts = products.filter(
    (product) => product.quantity < 10
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Inventory Management Dashboard</h1>

      <h3>Total Products: {products.length}</h3>
      <h3>Total Customers: {customers.length}</h3>
      <h3>Total Orders: {orders.length}</h3>

      <h2>Low Stock Products</h2>

      <ul>
        {lowStockProducts.map((product) => (
          <li key={product.id}>
            {product.name} - Stock: {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;