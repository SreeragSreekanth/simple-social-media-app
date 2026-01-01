import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await api.post(`/users/reset-password/${uid}/${token}/`, {
      new_password: password,
      confirm_password: confirm,
    });
    alert("Password reset successful");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-20 space-y-4">
      <input className="input" type="password" placeholder="New Password"
        onChange={e => setPassword(e.target.value)} />
      <input className="input" type="password" placeholder="Confirm Password"
        onChange={e => setConfirm(e.target.value)} />
      <button className="btn w-full">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
