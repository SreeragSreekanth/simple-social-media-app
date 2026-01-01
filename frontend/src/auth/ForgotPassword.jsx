import { useState } from "react";
import api from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/users/forgot-password/", { email });
    alert("Reset link sent");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-20 space-y-4">
      <input className="input" placeholder="Email"
        onChange={e => setEmail(e.target.value)} />
      <button className="btn w-full">Send Reset Link</button>
    </form>
  );
};

export default ForgotPassword;
