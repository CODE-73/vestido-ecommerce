import { FC } from 'react';
import { useRouter } from 'next/router';

import { clsx } from 'clsx';
import { IoLogOutOutline } from 'react-icons/io5';

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
    router.push('/login');
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className={clsx('flex gap-2 p-2', className)}
    >
      <IoLogOutOutline size={22} />{' '}
      <div className="sm:hidden uppercase"> Logout</div>
    </Button>
  );
};

export default LogoutButton;