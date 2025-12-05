import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';

interface User {
  id_funcionario: number;
  nome: string;
  nome_usuario: string;
  nivel_permissao: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('aerocode_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function login(userData: User) {
    setUser(userData);
    localStorage.setItem('aerocode_user', JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('aerocode_user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);