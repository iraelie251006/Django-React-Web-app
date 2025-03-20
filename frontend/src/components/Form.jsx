import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const Form = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nagivate = useNavigate();
  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        nagivate("/");
      } else {
        nagivate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
        <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center p-5 my-0.5 mx-auto rounded-lg shadow-2xl shadow-slate-900 max-w-[400px]"
    >
      <h1 className="text-2xl font-bold">{name}</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full p-2.5 mt-2.5 border-2 rounded-sm box-border"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2.5 mt-2.5 border-2 rounded-sm box-border"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full p-2.5 mt-5 bg-blue-500 text-white border-none rounded-sm cursor-pointer hover:bg-blue-700 ease-in-out transition duration-500"
      >
        {name}
      </button>
    </form>
    </div>
    
  );
};

export default Form;
