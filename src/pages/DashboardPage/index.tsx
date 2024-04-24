import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { User } from "../../services/interface";
import { fetchUsers } from "../../services";
import TableUser from "../../components/Table";

const DashboardPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    const authDataJson = sessionStorage.getItem("authData");
    if (authDataJson) {
      const authData = JSON.parse(authDataJson);
      const accessToken = authData.access_token;
      if (accessToken) {
        try {
          const fetchedUsers = await fetchUsers(accessToken);
          setUsers(fetchedUsers);
          setLoading(false);
        } catch (err) {
          console.error("Failed to fetch users:", err);
          setError("Failed to fetch users");
          setLoading(false);
        }
      } else {
        console.log("No access token available");
        setError("No access token available");
        setLoading(false);
      }
    } else {
      console.log("No auth data available");
      setError("No auth data available");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <section className="mx-auto max-w-screen-lg flex flex-col h-screen">
      <Header />
      <div className="min-h-screen bg-gray-100">
        <TableUser users={users} />
      </div>
    </section>
  );
};

export default DashboardPage;
