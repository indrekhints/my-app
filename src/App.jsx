
import { useState } from "react";

function App() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });




  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    console.log("Inserted user:", data.phone);

    alert(data.phone);

    setForm({ name: "", email: "", phone: "" });
  };



  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
      <h3>Add New User</h3>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      /><br />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      /><br />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      /><br />

      <button type="submit">Add User</button>
    </form>
  );

}

export default App;
