import { User } from "../../services/interface";
import { FaUserCircle } from "react-icons/fa"; // Importa los iconos que necesitas

interface ITableProps {
  users: User[];
}

const TableUser = ({ users }: ITableProps) => {
  return (
    <div className=" max-w-4xl mx-auto mt-8 p-4  bg-slate-600">
      <table className="w-full border-collapse">
        <thead>
          <tr className=" bg-slate-400">
            <th className="py-2 px-4 text-center">ID</th>
            <th className="py-2 px-4 text-center">Nombre</th>
            <th className="py-2 px-4 text-center">Fecha de cumpleaños</th>
            <th className="py-2 px-4 text-center">Correo electrónico</th>
            <th className="py-2 px-4 text-center">Foto</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.contactId} className="border-t bg-slate-200">
              <td className="py-2 px-4 text-center">{user.contactId}</td>
              <td className="py-2 px-4 text-center">{user.name}</td>
              <td className="py-2 px-4 text-center">{user.birthDate}</td>
              <td className="py-2 px-4 text-center">{user.email}</td>
              <td className="py-2 px-4 flex justify-center items-center">
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt="user"
                    className="h-10 w-10 rounded-full fill-orange-600"
                  />
                ) : (
                  <FaUserCircle />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUser;
