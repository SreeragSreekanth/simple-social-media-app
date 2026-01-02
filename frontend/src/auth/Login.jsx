import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      await login(email, password); // backend validation handled in AuthContext
      navigate("/"); // redirect after successful login
    } catch (err) {
      setError(err.message); // show backend error
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-6 rounded shadow w-80">
      <h1 className="text-xl font-semibold mb-4 text-center">
        Login
      </h1>

      <form onSubmit={submit} className="space-y-4">
        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <input
          className="border w-full p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border w-full p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  </div>
);

};

export default Login;
