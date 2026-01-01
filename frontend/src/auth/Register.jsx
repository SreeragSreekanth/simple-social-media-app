import { useState } from "react";
import api from "../api/axios";

const Register = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/users/register/", form);
    alert("Registered successfully");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-20 space-y-4">
      <input className="input" placeholder="Full Name"
        onChange={e => setForm({...form, full_name:e.target.value})} />
      <input className="input" placeholder="Email"
        onChange={e => setForm({...form, email:e.target.value})} />
      <input className="input" type="password" placeholder="Password"
        onChange={e => setForm({...form, password:e.target.value})} />
      <input className="input" type="password" placeholder="Confirm Password"
        onChange={e => setForm({...form, confirm_password:e.target.value})} />
      <button className="btn w-full">Register</button>
    </form>
  );
};

export default Register;
