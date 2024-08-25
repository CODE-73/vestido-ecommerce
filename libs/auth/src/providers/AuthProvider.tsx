import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';

type AuthContextValue = {
  isAuthenticated: boolean;
  loginRoute: string;
  token: string | null;
  setToken: (token: string) => void;
  authHeaders: Record<string, string>;
};

type AuthProviderProps = {
  children: ReactNode;
  autoLoginRedirect?: boolean;
  loginRoute?: string;
  fallback?: ReactNode;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
AuthContext.displayName = 'TokenContext';

export const AuthProvider = ({
  children,
  autoLoginRedirect = true,
  loginRoute: loginRoute = '/auth/login',
  fallback,
}: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const router = useRouter();

  // Read LS
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined') {
      setToken(token);
    } else if (autoLoginRedirect) {
      router.push(loginRoute); // Redirect to your login page
    }
    setAuthLoaded(true);
  }, []);

  if (!authLoaded) {
    return fallback;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        loginRoute,
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
