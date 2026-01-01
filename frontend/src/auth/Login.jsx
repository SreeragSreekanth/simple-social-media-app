import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await login(email, password);
    window.location.href = "/";
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-20 space-y-4">
      <input className="input" placeholder="Email"
        onChange={e => setEmail(e.target.value)} />
      <input className="input" type="password" placeholder="Password"
        onChange={e => setPassword(e.target.value)} />
      <button className="btn w-full">Login</button>
    </form>
  );
};

export default Login;
