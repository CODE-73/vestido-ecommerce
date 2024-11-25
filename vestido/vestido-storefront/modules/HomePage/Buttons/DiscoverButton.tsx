import clsx from 'clsx';

import { Button } from '@vestido-ecommerce/shadcn-ui/button';
type DiscoverButtonProps = {
  className?: string;
  bgLight?: boolean;
};

export const DiscoverButton: React.FC<DiscoverButtonProps> = ({
  className,
  bgLight,
}) => {
  return (
    <Button
      className={`mt-6 h-10 sm:h-12 rounded-none  uppercase font-bold tracking-wide px-10 ${clsx(className)} ${bgLight ? 'bg-white text-black hover:border hover:border-white hover:text-white' : 'bg-black text-white'}`}
    >
      discover now!
    </Button>
  );
};
