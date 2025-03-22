import { FC } from 'react';
import { useRouter } from 'next/router';

import { clsx } from 'clsx';
import { IoLogOutOutline } from 'react-icons/io5';

import { useAuth } from '@vestido-ecommerce/auth/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@vestido-ecommerce/shadcn-ui/alert-dialog';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';

type LogoutButtonProps = {
  className?: string;
  icon?: boolean;
};

const LogoutButton: FC<LogoutButtonProps> = ({ className, icon }) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="cursor-pointer">
        {icon ? (
          <Button variant="ghost" className={clsx('flex gap-2 p-0', className)}>
            <IoLogOutOutline size={22} />
          </Button>
        ) : (
          <div className="md:text-lg">Logout</div>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Sign Out</AlertDialogTitle>
          <AlertDialogDescription>
            Staying signed in ensures your cart, wishlist, and saved items are
            always accessible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutButton;
