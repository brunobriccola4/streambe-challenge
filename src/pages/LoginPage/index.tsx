import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Importa los iconos que necesitas

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const isFormComplete = username.length > 0 && password.length > 0;

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (isFormComplete) {
      login(username, password, () => {
        navigate("/dashboard");
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center w-full dark: bg-blue-50">
      <div className="bg-white ligth:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 light:text-gray-200">
          Login
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col">
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 light:text-gray-300 mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                id="username"
                className="pl-8 shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 light:text-gray-300 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"} // Muestra/oculta la contraseña
                id="password"
                className="pl-8 shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className=" text-gray-400" />
                ) : (
                  <FaEye className=" text-gray-400" />
                )}
              </div>
            </div>
          </div>
          <button
            className={`p-2 text-white rounded ${
              isFormComplete
                ? "bg-blue-800 hover:bg-blue-900"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            type="submit"
            disabled={!isFormComplete}
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
