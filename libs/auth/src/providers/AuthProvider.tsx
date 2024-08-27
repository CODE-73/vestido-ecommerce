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
  authHeaders: Record<string, string>;
  setToken: (token: string) => void;
  logout: () => void;
  routeToLogin: () => void;
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
  }, [router.asPath]);

  if (!authLoaded) {
    return fallback;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        loginRoute,
        token,
        authHeaders: {
          Authorization: `Bearer ${token}`,
        },
        setToken: (token: string) => {
          localStorage.setItem('token', token);
          setToken(token);
        },
        logout: () => {
          localStorage.removeItem('token');
          setToken(null);
        },
        routeToLogin: () => {
          router.push(loginRoute);
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
