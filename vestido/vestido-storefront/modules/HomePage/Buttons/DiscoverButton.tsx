import clsx from 'clsx';

import { Button } from '@vestido-ecommerce/shadcn-ui/button';
type DiscoverButtonProps = {
  className?: string;
  bgLight?: boolean;
  buttonText?: string;
};

export const DiscoverButton: React.FC<DiscoverButtonProps> = ({
  className,
  bgLight,
  buttonText,
}) => {
  return (
    <Button
      className={`h-10 sm:h-12 rounded-none max-w-[230px] uppercase font-bold cursor-pointer tracking-wide px-10 ${clsx(className)} ${bgLight ? 'bg-white text-black hover:border hover:border-white hover:text-white' : 'bg-black text-white'}`}
    >
      {buttonText ?? 'discover now!'}
    </Button>
  );
};
