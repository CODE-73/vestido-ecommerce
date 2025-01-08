import { useEffect, useState } from 'react';

const useMountAnimation = (animeIdx: number) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, animeIdx * 100);

    return () => clearTimeout(timer);
  }, [animeIdx]);

  return mounted;
};

export default useMountAnimation;
