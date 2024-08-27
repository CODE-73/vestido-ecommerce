import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';

import { type Profile } from '@prisma/client';
import { usePostHog } from 'posthog-js/react';

type AuthContextValue = {
  isAuthenticated: boolean;
  loginRoute: string;
  token: string | null;
  profile: Profile | null;
  authHeaders: Record<string, string>;
  onLogin: (profile: Profile, token: string) => void;
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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const router = useRouter();
  const posthog = usePostHog();

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
        profile,
        authHeaders: {
          Authorization: `Bearer ${token}`,
        },
        onLogin: (profile: Profile, token: string) => {
          localStorage.setItem('token', token);
          setToken(token);
          setProfile(profile);
          posthog.capture('$logged_in', {
            ...profile,
          });
          posthog.identify(profile.id, {
            ...profile,
          });
        },
        logout: () => {
          localStorage.removeItem('token');
          setToken(null);
          setProfile(null);
          posthog.capture('$logged_out', {
            ...profile,
          });
          posthog.reset();
        },
        routeToLogin: () => {
          router.push(loginRoute);
          posthog.capture('$auth_redirect', {
            from: router.asPath,
          });
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
