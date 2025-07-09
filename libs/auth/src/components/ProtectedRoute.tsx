import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../providers';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loginRoute, authLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoaded) return;
    if (!isAuthenticated) {
      router.push(loginRoute);
    }
  }, [authLoaded, isAuthenticated, loginRoute, router]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
};
