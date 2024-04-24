import { ILogin } from "../context/AuthContext/interface";
import { User } from "./interface";

const BASE_URL = 'https://www.mockachino.com/06c67c77-18c4-45';

export const loginService = async (username: string, password: string): Promise<ILogin | null> => {
  try {
    const response = await fetch('https://www.mockachino.com/06c67c77-18c4-45/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      // Asegúrate de que los datos cumplen con la interfaz User.
      const userData: ILogin = {
        username: data.username,
        name: data.name,
        lastname: data.lastname,
        roles: data.roles,
        token_type: data.token_type,
        access_token: data.access_token,
        expires_in: data.expires_in,
        refresh_token: data.refresh_token
      };
      
      sessionStorage.setItem("authData", JSON.stringify(userData));
      return userData;
    } else {
      console.error("Las credenciales no son válidas");
      return null;
    }
  } catch (error) {
    console.error("Error de conexión al intentar el login", error);
    return null;
  }
};

export const fetchUsers = async (token: string): Promise<User[]> => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('data', data)
    return data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

