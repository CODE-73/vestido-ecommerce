import { ReactNode, useEffect, useState } from 'react';

type MountAnimatorProps = {
  children: ReactNode;
  deferDuration?: number;
  deferIdx?: number;
};

const MountAnimator: React.FC<MountAnimatorProps> = ({
  children,
  deferDuration = 100,
  deferIdx = 0,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, deferIdx * deferDuration);

    return () => clearTimeout(timer);
  }, [deferDuration, deferIdx]);

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
