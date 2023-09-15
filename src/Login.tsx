import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { useAuth } from "./UserProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, user } = useAuth();

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      navigate("/workout");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col gap-2 mt-1">
        <h1 className="text-center font-bold text-4xl">Workout Tracker</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <button onClick={handleSignIn} className="btn btn-accent max-w-xs">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
