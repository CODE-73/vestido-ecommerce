'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthContextValue = {
  token: string | null;
  setToken: (token: string) => void;
  authHeaders: Record<string, string>;
};

type TokenProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
AuthContext.displayName = 'TokenContext';

export const AuthProvider = ({ children }: TokenProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  // const router = useRouter();

  // Read LS
  useEffect(() => {
    localStorage.getItem('token');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: (token: string) => {
          localStorage.setItem('token', token);
          setToken(token);
        },
        authHeaders: {
          Authorization: `Bearer ${token}`,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth was used outside of its Provider');
  }

  return context;
};
