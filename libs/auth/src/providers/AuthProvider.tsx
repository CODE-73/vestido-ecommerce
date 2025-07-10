import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';

import { type Profile } from '@prisma/client';
import * as Sentry from '@sentry/nextjs';
import { usePostHog } from 'posthog-js/react';

import { useLocalStorageState } from '@vestido-ecommerce/utils';

type AuthContextValue = {
  isAuthenticated: boolean;
  authLoaded: boolean;
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
}: AuthProviderProps) => {
  const router = useRouter();
  const posthog = usePostHog();
  const [authLoaded, setAuthLoaded] = useState(false);

  const [token, setToken, tokenLoaded] = useLocalStorageState<string | null>(
    'token',
    null,
  );
  const [profile, setProfile] = useLocalStorageState<Profile | null>(
    'profile',
    null,
  );

  useEffect(() => {
    if (!tokenLoaded) {
      return;
    }

    if (token && token !== 'undefined') {
      // pass
    } else if (autoLoginRedirect) {
      router.push(loginRoute); // Redirect to your login page
    }
    setAuthLoaded(true);
  }, [router.asPath, token, tokenLoaded]);

  useEffect(() => {
    if (profile) {
      posthog.identify(profile.id, {
        ...profile,
      });
      Sentry.setUser({
        id: profile.id,
        email: profile.email || profile.mobile || '',
        username: `${profile.firstName} ${profile.lastName}`.trim(),
      });
    } else {
      Sentry.setUser(null);
      posthog.reset();
    }
  }, [profile]);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        authLoaded,
        loginRoute,
        token,
        profile,
        authHeaders: {
          Authorization: `Bearer ${token}`,
        },
        onLogin: (profile: Profile, token: string) => {
          setToken(token);
          setProfile(profile);
          posthog.capture('$logged_in', {
            ...profile,
          });
        },
        logout: () => {
          setToken(null);
          setProfile(null);
          posthog.capture('$logged_out', {
            ...profile,
          });
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
