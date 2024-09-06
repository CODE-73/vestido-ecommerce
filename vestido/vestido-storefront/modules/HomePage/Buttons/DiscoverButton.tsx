import clsx from 'clsx';

import { Button } from '@vestido-ecommerce/shadcn-ui/button';
type DiscoverButtonProps = {
  className?: string;
};

export const DiscoverButton: React.FC<DiscoverButtonProps> = ({
  className,
}) => {
  return (
    <Button
      className={`mt-6 h-10 sm:h-12 rounded-none hover:bg-black text-white bg-[#48CAB2] uppercase font-bold tracking-wide px-10 ${clsx(className)}`}
    >
      discover now!
    </Button>
  );
};
