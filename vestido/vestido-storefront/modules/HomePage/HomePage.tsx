import * as React from 'react';

import { LuChevronUp } from 'react-icons/lu';

import useIsMobile from '../../hooks/useIsMobile';
import { CategoryCards } from './CategorySection/CategoryCards';
import { HorizontalScrollCards } from './HorizontalScroll/HorizontalScrollCards';
import { PopularCollection } from './Popular/PopularCollection';
import { PrimaryCarousel } from './PrimaryCarousel/PrimaryCarousel';
import { TopProducts } from './TopProducts/TopProducts';

const BackToTopButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    className="fixed bottom-8 right-8 bg-neutral-800 hover:bg-[#48CAB2] text-white px-4 py-4 shadow transition-colors duration-200"
    onClick={onClick}
  >
    <LuChevronUp />
  </button>
);

const HomePage: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowBackToTop(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const height = '700px';

  return (
    <div className="flex flex-col justify-center ">
      <div className="flex flex-col lg:flex-col-reverse justify-center">
        <CategoryCards /> <PrimaryCarousel />
      </div>
      <TopProducts className="pt-16 sm:pt-24 max-w-[100vw] overflow-hidden px-4 sm:px-0 md:px-4 lg:max-w-7xl lg:self-center" />

      <PopularCollection className="pt-16 px-1 sm:px-0" />
      <div style={{ height: height, minHeight: height }}>
        <HorizontalScrollCards className="w-full relative mt-20 px-1 sm:px-0" />
      </div>
      {!isMobile && showBackToTop && <BackToTopButton onClick={scrollToTop} />}
    </div>
  );
};

export default HomePage;
