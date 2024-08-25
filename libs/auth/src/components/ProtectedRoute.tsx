import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../providers';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loginRoute } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(loginRoute);
    }
  }, [isAuthenticated, loginRoute, router]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
};
