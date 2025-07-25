import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { LuHeart, LuSearch, LuShoppingBag, LuUser2 } from 'react-icons/lu';

import { AuthenticatedLink, useAuth } from '@vestido-ecommerce/auth/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';

import Menubar from '../../components/nav-menu';
import LogoutButton from '../logout-button';
import { SearchCombobox } from './search-combobox';

interface HeaderProps {
  cart_count: number;
  wishlist_count: number;
}
interface SearchItem {
  label: string;
  value: string;
}

const MainHeader: React.FC<HeaderProps> = ({ cart_count, wishlist_count }) => {
  const { isAuthenticated, authLoaded } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  const [selectedItem, setSelectedItem] = React.useState<SearchItem | null>(
    null,
  );

  const handleSelect = (item: SearchItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="bg-black sm:shadow-lg flex items-center px-3 xl:px-32 sticky top-0  sm:shadow-gray-700/50 ">
      <div className="flex flex-grow">
        <Link href="/" className="self-center">
          <span className="self-end hidden sm:block">
            <Image
              src="/assets/vestido-nation-logo.png"
              alt="Logo"
              width="180"
              height="35"
            />
          </span>
        </Link>
      </div>
      <div className="flex divide-x items-center divide-gray-700">
        <div className="flex items-center gap-3 pl-2">
          {searchOpen ? (
            <div className="">
              <SearchCombobox
                onSelect={handleSelect}
                selectedItem={selectedItem}
                setIsSearchExpanded={setSearchOpen}
              />
            </div>
          ) : (
            <>
              <div className=" sm:py-4">
                <Menubar />
              </div>
              <LuSearch
                size={20}
                className="text-white cursor-pointer "
                onClick={() => setSearchOpen(true)}
              />
            </>
          )}

          <AuthenticatedLink
            href="/profile/profile"
            className="text-white hover:text-gray-400"
          >
            <LuUser2 size={20} />
          </AuthenticatedLink>

          <Link
            href="/wishlist"
            className={`relative text-white hover:text-gray-400 `}
          >
            <LuHeart size={20} />
            {wishlist_count > 0 && (
              <sup className="absolute -right-[8px] h-4 w-4 text-center rounded-full bg-white text-black font-semibold text-xs">
                {wishlist_count}
              </sup>
            )}
          </Link>
          <Link
            href="/cart"
            className={`relative text-white hover:text-gray-400`}
          >
            <LuShoppingBag size={20} />
            {cart_count > 0 && (
              <sup className="absolute -right-[8px]  h-4 w-4 text-center rounded-full bg-white text-black font-semibold text-xs">
                {cart_count}
              </sup>
            )}
          </Link>

          {authLoaded && isAuthenticated ? (
            <LogoutButton
              icon
              className="text-white hover:text-gray-400 hover:bg-transparent"
            />
          ) : (
            <Link href="/login">
              <Button className="rounded-none h-10 bg-white text-black ml-4 hover:bg-white">
                Login/Signup
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
