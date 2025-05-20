import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

// Define User type
type User = {
  id: number;
  username: string;
  email: string;
};

// Create the AuthContext with an initial empty state
const AuthContext = createContext<{
  user: User | null;
  isAuthenticated: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
}>({
  user: null,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // State to store user data and authentication status
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Logout function to clear localStorage and reset user state
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, setUser, setIsAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
