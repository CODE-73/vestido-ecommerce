'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';

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
  const [authLoaded, setAuthLoaded] = useState(false);
  const router = useRouter();

  // Read LS
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined') {
      setToken(token);
    } else {
      router.push('/auth/login'); // Redirect to your login page
    }
    setAuthLoaded(true);
  }, []);

  if (!authLoaded) {
    // TODO: Change this to <LoadingSpinner />
    return null;
  }

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
