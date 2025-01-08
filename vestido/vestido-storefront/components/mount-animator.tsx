import { ReactNode, useEffect, useState } from 'react';

type MountAnimatorProps = {
  children: ReactNode;
  animeIdx: number;
};

const MountAnimator: React.FC<MountAnimatorProps> = ({
  children,
  animeIdx,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, animeIdx * 100);

    return () => clearTimeout(timer);
  }, [animeIdx]);
  return (
    <div
      className=" transition-all duration-500 ease-in-out"
      style={{
        transform: `${mounted ? 'translateY(0)' : 'translateY(64px)'}`,
        opacity: `${mounted ? '1' : '0'}`,
      }}
    >
      {children}
    </div>
  );
};

export default MountAnimator;
