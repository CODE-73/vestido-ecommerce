// useIsMobile.js
import { useMediaQuery } from '@react-hook/media-query';

const useIsMobile = () => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  return isMobile;
};

export default useIsMobile;
