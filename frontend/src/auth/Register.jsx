import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  
  const validate = () => {
    const newErrors = {};
    if (!form.full_name.trim()) newErrors.full_name = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.confirm_password !== form.password)
      newErrors.confirm_password = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await api.post("/users/register/", form); 
      alert("Registered successfully");
      navigate("/login");
      
    } catch (err) {
      setErrors({ general: "Registration failed: email may already be in use" });
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-6 rounded shadow w-96">
      <h1 className="text-xl font-semibold mb-4 text-center">
        Register
      </h1>

      <form onSubmit={submit} className="space-y-4">
        {errors.general && (
          <div className="text-red-500 text-sm text-center">
            {errors.general}
          </div>
        )}

        <div>
          <input
            className="border w-full p-2 rounded"
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm">
              {errors.full_name}
            </p>
          )}
        </div>

        <div>
          <input
            className="border w-full p-2 rounded"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <input
            className="border w-full p-2 rounded"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <input
            className="border w-full p-2 rounded"
            type="password"
            placeholder="Confirm Password"
            value={form.confirm_password}
            onChange={(e) =>
              setForm({ ...form, confirm_password: e.target.value })
            }
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm">
              {errors.confirm_password}
            </p>
          )}
        </div>

        <button className="bg-black text-white w-full py-2 rounded">
          Register
        </button>
      </form>
    </div>
  </div>
);

};

export default Register;
