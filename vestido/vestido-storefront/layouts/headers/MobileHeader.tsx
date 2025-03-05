import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { AiOutlineClose } from 'react-icons/ai';
import { LuAlignLeft, LuSearch } from 'react-icons/lu';

import { HeaderSearchInput } from './HeaderSearchInput';

interface HeaderProps {
  cart_count: number;
  wishlist_count: number;
}
const MobileHeader: React.FC<HeaderProps> = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

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
          <div className="text-white md:hidden" onClick={toggleDrawer}>
            {isDrawerOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <LuAlignLeft color="white" size={26} />
            )}
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
              iconSize={32}
              onCancelClick={toggleSearch}
              containerClassName="absolute  inset-0 w-full h-full p-2 border border-gray-300 rounded-l-md focus:outline-none bg-white"
            />
          ) : (
            <LuSearch
              size={30}
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
