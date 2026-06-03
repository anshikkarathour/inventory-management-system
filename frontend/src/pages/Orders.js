import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const res = await API.get("/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>

      <ul>
        {orders.map(o => (
          <li key={o.id}>
            Order #{o.id} - Total: {o.total_amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;