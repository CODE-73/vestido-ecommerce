import { FC } from 'react';
import { useRouter } from 'next/router';

import { clsx } from 'clsx';
import { LuLogOut } from 'react-icons/lu';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';

type LogoutButtonProps = {
  className?: string;
};

const LogoutButton: FC<LogoutButtonProps> = ({ className }) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className={clsx('flex gap-2 p-2', className)}
    >
      Logout
      <LuLogOut className="ml-auto" size={24} />
    </Button>
  );
};

export default LogoutButton;
