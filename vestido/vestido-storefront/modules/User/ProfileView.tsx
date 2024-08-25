import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';

import { AiOutlineUser } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa';
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
  const [selectedNav, setSelectedNav] = useState('overview');
  console.log(selectedNav, 'selected');

  return (
    <>
      <div className="hidden md:block 2xl:px-72 my-20">
        <div className="font-semibold text-lg">Account</div>
        <div className="uppercase  text-lg my-4">
          {currentUser?.firstName}&nbsp; {currentUser?.lastName}
        </div>
        <hr />

        <Tabs
          value={selectedNav}
          onValueChange={setSelectedNav}
          defaultValue="overview"
          className="flex divide-x gap-3 bg-transparent min-h-[400px]"
        >
          <div className="w-64 basis-1/4 p-4">
            <TabsList className="flex flex-col bg-transparent justify-start items-start">
              <TabsTrigger
                className="bg-transparent border-none data-[state=active]:border-none data-[state=active]:text-[#48cab2] text-lg hover:text-[#48cab2] my-4 px-0"
                value="overview"
              >
                Overview
              </TabsTrigger>
              <div>ORDERS</div>
              <TabsTrigger
                className="bg-transparent border-none data-[state=active]:border-none data-[state=active]:text-[#48cab2] text-lg hover:text-[#48cab2] my-4 px-0"
                value="orders"
              >
                Orders & Returns
              </TabsTrigger>
              <div>ACCOUNT</div>
              <TabsTrigger
                className="bg-transparent border-none data-[state=active]:border-none data-[state=active]:text-[#48cab2] text-lg hover:text-[#48cab2] mt-4 mb-1 px-0"
                value="profile"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                className="bg-transparent border-none data-[state=active]:border-none data-[state=active]:text-[#48cab2] text-lg hover:text-[#48cab2] my-1 px-0"
                value="addresses"
              >
                Addresses
              </TabsTrigger>
              <TabsTrigger
                className="bg-transparent border-none data-[state=active]:border-none data-[state=active]:text-[#48cab2] text-lg hover:text-[#48cab2] my-1 px-0"
                value="delete"
              >
                Delete Account
              </TabsTrigger>
              <div>LEGAL</div>
              <ul>
                <li className="my-4">
                  <Link
                    href="/privacy_policy"
                    className="text-lg hover:text-[#48cab2] "
                  >
                    Terms of Use
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href="/privacy_policy"
                    className=" text-lg hover:text-[#48cab2]"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </TabsList>
          </div>
          <div className="basis-4/5 px-4">
            <TabsContent value="overview">
              <div className="grid grid-cols-4 mt-3  gap-4 justify-center items-center">
                <div className="flex items-center justify-between col-span-4 border border-1 border-stone-300 shadow p-10">
                  <div className="flex gap-2 items-center text-xl font-semibold">
                    <div className="h-20 w-20 flex border border-1 justify-center items-center ">
                      <AiOutlineUser size={40} />
                    </div>
                    {currentUser?.email ??
                      currentUser?.mobile ??
                      currentUser?.firstName}
                  </div>
                  <Button>Edit Profile</Button>
                </div>
                {nav_items.map((nav_item, index) => (
                  <div
                    key={index}
                    className="cursor flex gap-2 justify-center items-center border border-2  hover:border-[#48CAB2] border-stone-300 shadow py-20 xl:py-24 text-xl font-semibold text-gray-500  hover:text-[#48CAB2] cursor-pointer"
                    onClick={() => setSelectedNav(nav_item.value)}
                  >
                    {nav_item.icon} {nav_item.title}
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="orders">
              <OrdersView profileId={currentUser?.id ?? ''} />
            </TabsContent>
            <TabsContent value="profile">
              <Profile />
            </TabsContent>
            <TabsContent value="addresses">
              <Addresses />
            </TabsContent>
            <TabsContent value="delete">
              <DeleteAccount />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <div className="md:hidden">Hi</div>
    </>
  );
};

export default ProfileView;
