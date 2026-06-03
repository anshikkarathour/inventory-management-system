import { useEffect, useState } from "react";
import API from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const loadCustomers = async () => {
    const res = await API.get("/customers");
    setCustomers(res.data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCustomer = async () => {
    await API.post("/customers", form);
    setForm({ name: "", email: "", phone: "" });
    loadCustomers();
  };

  return (
    <div>
      <h2>Customers</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />

      <button onClick={addCustomer}>Add Customer</button>

      <ul>
        {customers.map(c => (
          <li key={c.id}>
            {c.name} - {c.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Customers;