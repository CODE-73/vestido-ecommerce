import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { LuHeart, LuSearch } from 'react-icons/lu';

import { HeaderSearchInput } from './HeaderSearchInput';

interface HeaderProps {
  wishlist_count: number;
}
const MobileHeader: React.FC<HeaderProps> = ({ wishlist_count }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    // Create ResizeObserver instance
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Get the height from the observed element
        const height = entry.contentRect.height;
        // Set CSS variable on document root
        document.documentElement.style.setProperty(
          '--navbar-height',
          `${height}px`,
        );
      }
    });

    const navbarNode = navbarRef.current;

    // Start observing the navbar element
    if (navbarNode) {
      resizeObserver.observe(navbarNode);
    }

    // Cleanup: stop observing when component unmounts
    return () => {
      if (navbarNode) {
        resizeObserver.unobserve(navbarNode);
      }
      resizeObserver.disconnect();
    };
  }, []);

  const toggleSearch = () => {
    if (isSearchExpanded) {
      setIsSearchExpanded(false);
    }
    if (!isSearchExpanded) {
      setIsSearchExpanded(true);
    }
  };

  return (
    <div ref={navbarRef}>
      <header className="bg-black shadow-lg shadow-gray-700/50 py-4 px-2 md:px-10">
        <div className="flex justify-between items-center">
          <div className="text-white md:hidden">
            <Link href="/wishlist" className={`relative hover:text-gray-400 `}>
              <LuHeart size={24} />
              {wishlist_count > 0 && (
                <sup className="absolute -right-[8px] h-4 w-4 text-center rounded-full bg-white text-black font-semibold text-xs">
                  {wishlist_count}
                </sup>
              )}
            </Link>
          </div>

          <Link href="/">
            <Image
              src="/assets/vestido-nation-logo.png"
              alt="Logo"
              width="200"
              height="35"
            />
          </Link>

          {isSearchExpanded ? (
            <HeaderSearchInput
              iconSize={24}
              onCancelClick={toggleSearch}
              containerClassName="absolute inset-0 w-screen h-full text-white focus:outline-none"
              setSearchOpen={setIsSearchExpanded}
            />
          ) : (
            <LuSearch
              size={24}
              onClick={toggleSearch}
              className="z-50"
              color="white"
            />
          )}
        </div>
      </header>
    </div>
  );
};

export default MobileHeader;
