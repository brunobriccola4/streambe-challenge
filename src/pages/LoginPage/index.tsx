import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa"; // Importa los iconos que necesitas

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
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Iniciar sesión</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre de usuario
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                className="mt-1 p-2 w-full border rounded"
                placeholder="Ingresa tu nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FaUser className="absolute right-4 top-4 text-gray-400" />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="mt-1 p-2 w-full border rounded"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute top-4 right-4 cursor-pointer"
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
            type="submit"
            className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
              !username || !password ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!username || !password}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
