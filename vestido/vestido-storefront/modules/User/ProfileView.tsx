import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useMediaQuery } from '@react-hook/media-query';
import { LuChevronLeft } from 'react-icons/lu';

import { useProfile } from '@vestido-ecommerce/auth/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@vestido-ecommerce/shadcn-ui/tabs';

import Addresses from './Addresses';
import DeleteAccount from './DeleteAccount';
import OrdersView from './Orders';
import Profile from './Profile';

const ProfileView: React.FC = () => {
  const { data } = useProfile();
  const currentUser = data?.data;
  const [selectedNav, setSelectedNav] = useState<string>('');

  const isSmallScreen = useMediaQuery('(max-width:768px');
  useEffect(() => {
    if (isSmallScreen) {
      setSelectedNav(''); // None for small screens
    } else {
      setSelectedNav('profile');
    }
  }, [isSmallScreen]);

  return (
    <>
      <div className="2xl:px-72 my-20 text-white px-3 ">
        <h4 className="md:text-lg">Account</h4>
        <h3 className="uppercase md:text-lg my-1 md:my-4">
          {currentUser?.firstName}&nbsp; {currentUser?.lastName}
        </h3>
        <hr className="border-gray-600" />
        <hr className="border-gray-600 md:hidden relative" />

        <Tabs
          value={selectedNav}
          onValueChange={setSelectedNav}
          className="flex flex-col md:flex-row divide-x text-xs md:text-base gap-1 md:gap-3 bg-transparent min-h-[280px] md:min-h-[400px]"
        >
          {!isSmallScreen || !selectedNav ? (
            <div className="w-full md:w-64 md:basis-1/4 p-2 md:p-4">
              <TabsList className="flex flex-col bg-transparent justify-start items-start text-slate-300 text-sm md:text-base">
                <TabsTrigger
                  className="bg-transparent border-none data-[state=active]:border-none data-[state=active]:underline underline-offset-800 data-[state=active]:bg-transparent data-[state=active]:text-white text-sm md:text-lg mt-4 mb-1 px-0"
                  value="profile"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  className="bg-transparent border-none data-[state=active]:border-none data-[state=active]:underline underline-offset-800 data-[state=active]:bg-transparent data-[state=active]:text-white text-sm md:text-lg mt-4 mb-1 px-0"
                  value="orders"
                >
                  Orders & Returns
                </TabsTrigger>

                <TabsTrigger
                  className="bg-transparent border-none data-[state=active]:border-none data-[state=active]:underline underline-offset-800 data-[state=active]:bg-transparent data-[state=active]:text-white text-sm md:text-lg  my-1 px-0"
                  value="addresses"
                >
                  Addresses
                </TabsTrigger>
                <TabsTrigger
                  className="bg-transparent border-none data-[state=active]:border-none data-[state=active]:underline underline-offset-800 data-[state=active]:bg-transparent data-[state=active]:text-white text-sm md:text-lg  my-1 px-0"
                  value="delete"
                >
                  Delete Account
                </TabsTrigger>

                <ul>
                  <li className="my-4">
                    <Link
                      href="/terms-and-conditions"
                      className="text-sm md:text-lg hover:underline"
                    >
                      Terms of Use
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      href="/privacy-policy"
                      className=" text-sm md:text-lg hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </TabsList>
            </div>
          ) : null}

          <div className={`w-full md:basis-4/5 px-1 md:px-4 `}>
            {' '}
            {/*${isSmallScreen && selectedNav ? '' : 'hidden'}*/}
            <TabsContent value="orders" className="relative">
              {isSmallScreen && selectedNav && (
                <>
                  <Button
                    className="bg-transparent text-white p-0 flex items-center"
                    onClick={() => setSelectedNav('')}
                  >
                    <LuChevronLeft size={24} />{' '}
                    <div className="font-semibold my-4 md:hidden ">
                      All Orders
                    </div>
                  </Button>
                  <hr className="border-gray-600  mb-2" />
                </>
              )}
              <OrdersView />
            </TabsContent>
            <TabsContent value="profile">
              {isSmallScreen && selectedNav && (
                <>
                  <Button
                    className="bg-transparent text-white h-10 p-0 flex items-center"
                    onClick={() => setSelectedNav('')}
                  >
                    <LuChevronLeft size={24} />{' '}
                    <div className="font-semibold text-xs md:text-lg my-4 md:hidden">
                      Profile Details
                    </div>
                  </Button>
                </>
              )}
              <Profile />
            </TabsContent>
            <TabsContent value="addresses" className="relative">
              {isSmallScreen && selectedNav && (
                <>
                  <Button
                    className="bg-transparent text-white p-0 absolute -top-0.5 left-0"
                    onClick={() => setSelectedNav('')}
                  >
                    <LuChevronLeft size={24} />{' '}
                  </Button>
                </>
              )}
              <Addresses />
            </TabsContent>
            <TabsContent value="delete">
              {isSmallScreen && selectedNav && (
                <>
                  <Button
                    className="bg-transparent text-white p-0 flex items-center"
                    onClick={() => setSelectedNav('')}
                  >
                    <LuChevronLeft size={24} />{' '}
                    <div className="font-semibold text-lg my-4 md:hidden">
                      Delete Account
                    </div>
                  </Button>
                  <hr className="border-gray-600 -mx-3 mb-2" />
                </>
              )}
              <DeleteAccount />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default ProfileView;
