import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useMediaQuery } from '@react-hook/media-query';
import { AiOutlineUser } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa';
import { LuChevronLeft } from 'react-icons/lu';
import { MdLocationOn } from 'react-icons/md';
import { PiPackage } from 'react-icons/pi';

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
import EditProfileForm from './EditProfileForm';
import OrdersView from './Orders';
import Profile from './Profile';

const nav_items = [
  {
    title: 'Orders',
    icon: <PiPackage size={32} />,
    link: 'Orders & Returns',
    value: 'orders',
  },
  { title: 'Wishlist', icon: <FaRegHeart size={32} />, value: '' },
  {
    title: 'Addresses',
    icon: <MdLocationOn size={32} />,
    link: 'Addresses',
    value: 'addresses',
  },
  {
    title: 'Profile',
    icon: <AiOutlineUser size={32} />,
    link: 'Profile',
    value: 'profile',
  },
];

const ProfileView: React.FC = () => {
  const { data } = useProfile();
  const currentUser = data?.data;
  const [selectedNav, setSelectedNav] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const isSmallScreen = useMediaQuery('(max-width:768px');
  useEffect(() => {
    if (isSmallScreen) {
      setSelectedNav(''); // None for small screens
    } else {
      setSelectedNav('overview'); // 'overview' for medium screens and above
    }
  }, [isSmallScreen]);

  return (
    <>
      <div className="2xl:px-72 my-20 text-white px-3 ">
        <div className="font-semibold md:text-lg">Account</div>
        <div className="uppercase md:text-lg my-1 md:my-4">
          {currentUser?.firstName}&nbsp; {currentUser?.lastName}
        </div>
        <hr className="border-gray-600" />
        <hr className="border-gray-600 md:hidden relative" />

        <Tabs
          value={selectedNav}
          onValueChange={setSelectedNav}
          className="flex flex-col md:flex-row divide-x text-xs md:text-base gap-1 md:gap-3 bg-transparent min-h-[280px] md:min-h-[400px]"
        >
          {!isSmallScreen || !selectedNav ? (
            <div className="w-full md:w-64 md:basis-1/4 p-2 md:p-4">
              <TabsList className="flex flex-col bg-transparent justify-start items-start text-white text-sm md:text-base">
                {!isSmallScreen && (
                  <TabsTrigger
                    className="bg-transparent data-[state=active]:border-none  data-[state=active]:bg-transparent text-sm md:text-lg data-[state=active]:text-[#48cab2] my-4 px-0"
                    value="overview"
                  >
                    Overview
                  </TabsTrigger>
                )}

                <TabsTrigger
                  className="bg-transparent border-none data-[state=active]:border-none data-[state=active]:text-[#48cab2] data-[state=active]:bg-transparent text-sm md:text-lg data-[state=active]:text-[#48cab2] mt-4 mb-1 px-0"
                  value="orders"
                >
                  Orders & Returns
                </TabsTrigger>

                <TabsTrigger
                  className="bg-transparent border-none data-[state=active]:border-none data-[state=active]:text-[#48cab2] data-[state=active]:bg-transparent text-sm md:text-lg data-[state=active]:text-[#48cab2] mt-4 mb-1 px-0"
                  value="profile"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  className="bg-transparent border-none data-[state=active]:border-none data-[state=active]:text-[#48cab2] data-[state=active]:bg-transparent text-sm md:text-lg data-[state=active]:text-[#48cab2] my-1 px-0"
                  value="addresses"
                >
                  Addresses
                </TabsTrigger>
                <TabsTrigger
                  className="bg-transparent border-none data-[state=active]:border-none data-[state=active]:text-[#48cab2] data-[state=active]:bg-transparent text-sm md:text-lg data-[state=active]:text-[#48cab2] my-1 px-0"
                  value="delete"
                >
                  Delete Account
                </TabsTrigger>

                <ul>
                  <li className="my-4">
                    <Link
                      href="/terms-and-conditions"
                      className="text-sm md:text-lg hover:text-[#48cab2]"
                    >
                      Terms of Use
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      href="/privacy-policy"
                      className=" text-sm md:text-lg hover:text-[#48cab2]"
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
            <TabsContent
              value="overview"
              className={`${isSmallScreen && selectedNav ? 'hidden' : ''}`}
            >
              {isEditing ? (
                <EditProfileForm />
              ) : (
                <div className="grid grid-cols-4 mt-3 gap-4 justify-center items-center">
                  <div className="flex items-center justify-between col-span-4 border border-1 border-stone-300 shadow p-10">
                    <div className="flex gap-2 items-center text-xl font-semibold">
                      <div className="h-20 w-20 flex border border-1 justify-center items-center">
                        <AiOutlineUser size={40} />
                      </div>
                      {currentUser?.email ??
                        currentUser?.mobile ??
                        currentUser?.firstName}
                    </div>

                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-white text-black hover:bg-white hover:text-black"
                    >
                      Edit Profile
                    </Button>
                  </div>
                  {nav_items.map((nav_item, index) => (
                    <div
                      key={index}
                      className="cursor flex gap-2 justify-center items-center border border-2 hover:border-[#48CAB2] border-stone-300 shadow py-20 xl:py-24 text-xl font-semibold text-gray-500 hover:text-[#48CAB2] cursor-pointer"
                      onClick={() => setSelectedNav(nav_item.value)}
                    >
                      {nav_item.icon} {nav_item.title}
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="orders" className="relative">
              {isSmallScreen && selectedNav && (
                <>
                  <Button
                    className="bg-transparent text-white p-0 flex items-center"
                    onClick={() => setSelectedNav('')}
                  >
                    <LuChevronLeft size={24} />{' '}
                    <div className="font-semibold my-4 md:hidden">
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
