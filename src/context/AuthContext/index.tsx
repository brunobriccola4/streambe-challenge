import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType, AuthState, IAuthProviderProps } from "./interface";
import { loginService } from "../../services";

const initialState: AuthState = {
  loginUser: undefined,
  isAuthenticated: false
};

export const AuthContext = createContext<AuthContextType>({
  authState: initialState,
  login: () => {},
  logout: () => {}
});

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("authData");
    if (storedUser) {
      setAuthState({
        loginUser: JSON.parse(storedUser),
        isAuthenticated: true
      });
    }
  }, []);

  const login = async (username: string, password: string, onSuccess: () => void) => {
    console.log('login', username)
    const userData = await loginService(username, password);
    if (userData) {
      setAuthState({
        loginUser: userData,
        isAuthenticated: true
      });
      onSuccess();
    }
  };

  const logout = () => {
    setAuthState({
      loginUser: undefined,
      isAuthenticated: false
    });
    sessionStorage.removeItem("authData");
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);