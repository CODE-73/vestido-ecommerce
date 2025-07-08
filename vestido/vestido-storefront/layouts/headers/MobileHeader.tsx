import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { LuHeart, LuSearch } from 'react-icons/lu';

import { SearchCombobox } from './search-combobox';
import SubHeader from './SubHeader';

interface HeaderProps {
  wishlist_count: number;
}
interface SearchItem {
  label: string;
  value: string;
}
const MobileHeader: React.FC<HeaderProps> = ({ wishlist_count }) => {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const navbarRef = useRef(null);
  const isHome = router.pathname === '/';
  const [selectedItem, setSelectedItem] = useState<SearchItem | null>(null);

  const handleSelect = (item: SearchItem) => {
    setSelectedItem(item);
  };

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
    if (searchOpen) {
      setSearchOpen(false);
    }
    if (!searchOpen) {
      setSearchOpen(true);
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
              src="/assets/name-without-logo.png"
              alt="Logo"
              width="200"
              height="35"
            />
          </Link>

          {searchOpen ? (
            <SearchCombobox
              containerClassName="absolute inset-0 w-screen h-full focus:outline-none bg-black pt-5"
              onSelect={handleSelect}
              selectedItem={selectedItem}
              setIsSearchExpanded={setSearchOpen}
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
      {isHome && <SubHeader />}
    </div>
  );
};

export default MobileHeader;
