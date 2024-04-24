import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaSun, FaSignOutAlt } from "react-icons/fa"; // Importa los iconos que necesitas

export const Header = () => {
  const { authState, logout } = useContext(AuthContext);
  const { loginUser } = authState;
  return (
    <header className="bg-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-semibold">Bienvenido {loginUser?.name}</h1>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800">
          <FaSun />
        </button>
        <button className="text-red-600 hover:text-red-800" onClick={logout}>
          <FaSignOutAlt />
        </button>
      </div>
    </header>
  );
};
