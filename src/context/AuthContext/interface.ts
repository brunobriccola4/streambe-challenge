export interface ILogin {
  username: string;
  name: string;
  lastname: string;
  roles: string[];
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

export interface AuthState {
  loginUser?: ILogin;
  isAuthenticated: boolean;
}

export interface AuthContextType {
  authState: AuthState;
  login: (username: string, password: string, onSuccess: () => void) => void;
  logout: () => void;
}

export interface IAuthProviderProps {
  children: React.ReactNode;
}
