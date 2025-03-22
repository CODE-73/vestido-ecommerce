import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useMediaQuery } from '@react-hook/media-query';
import { FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { IoLogoAndroid, IoLogoApple } from 'react-icons/io';
import { LuFacebook } from 'react-icons/lu';
import { LuChevronLeft } from 'react-icons/lu';

import { useProfile } from '@vestido-ecommerce/auth/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@vestido-ecommerce/shadcn-ui/tabs';

import LogoutButton from '../../layouts/logout-button';
import ContactUs from '../documents/contact-us';
import FAQ from '../documents/faq';
import PrivacyPolicy from '../documents/privacy-policy';
import ReturnExchange from '../documents/return-exchange';
import ShippingPolicy from '../documents/shipping-policy';
import TermsAndConditions from '../documents/t-and-c';
import OrdersView from '../orders/order-list/order-list';
import Addresses from './Addresses';
import DeleteAccount from './DeleteAccount';
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

  const profileTabs = [
    { value: 'profile', label: 'Profile' },
    { value: 'orders', label: 'Orders & Returns' },
    { value: 'addresses', label: 'Addresses' },
    { value: 't&c', label: 'Terms of Use' },
    { value: 'privacy', label: 'Privacy Policy' },
    { value: 'faq', label: 'FAQs' },
    { value: 'shipping', label: 'Shipping Policy' },
    { value: 'return', label: 'Return & Exchange' },
    { value: 'contact', label: 'Contact Us' },
    { value: 'delete', label: 'Delete Account' },
  ];
  const TabContent = ({
    value,
    label,
    children,
  }: {
    value: string;
    label: string;
    children: React.ReactNode;
  }) => (
    <TabsContent value={value} className="relative">
      {isSmallScreen && selectedNav && (
        <>
          <Button
            className="bg-transparent text-white p-0 flex items-center"
            onClick={() => setSelectedNav('')}
          >
            <LuChevronLeft size={24} />
            <div className="font-semibold text-lg my-4 md:hidden">{label}</div>
          </Button>
          <hr className="border-gray-600 mb-2" />
        </>
      )}
      {children}
    </TabsContent>
  );

  return (
    <div className="2xl:px-72 my-20 text-white px-3 relative">
      <h4 className="md:text-lg">Account</h4>
      <h3 className="uppercase md:text-lg my-1 md:my-4">
        {currentUser?.firstName}&nbsp; {currentUser?.lastName}
      </h3>
      <hr className="border-gray-600" />
      <hr className="border-gray-600 md:hidden relative" />

      <Tabs
        value={selectedNav}
        onValueChange={setSelectedNav}
        className="flex flex-col md:flex-row divide-x text-xs md:text-base gap-1 md:gap-3 bg-transparent min-h-[280px] max-h-screen-minus-nav md:min-h-[500px]"
      >
        {!isSmallScreen || !selectedNav ? (
          <div className="h-full w-full md:w-64 md:basis-1/4 p-2 md:p-4">
            <TabsList className="h-full flex flex-col bg-transparent justify-start items-start text-slate-300 text-sm md:text-base">
              {profileTabs.map(({ value, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="bg-transparent border-none data-[state=active]:border-none data-[state=active]:underline underline-offset-800 data-[state=active]:bg-transparent data-[state=active]:text-white text-sm md:text-lg mb-1 px-0"
                >
                  {label}
                </TabsTrigger>
              ))}
              <LogoutButton icon={false} />
              <div className="sm:hidden w-full mt-32">
                <div className="w-full flex justify-around mt-3">
                  {' '}
                  <Link href="https://www.facebook.com/people/Vestido-Nation/61554017931370/?mibextid=ZbWKwL">
                    <div className="sm:rounded-full sm:bg-white sm:p-2 cursor-pointer">
                      <LuFacebook
                        strokeWidth={0.5}
                        size={20}
                        className="fill-white sm:fill-black"
                      />
                    </div>
                  </Link>
                  <div className="sm:rounded-full sm:bg-white sm:p-2  cursor-pointer">
                    <FaXTwitter
                      className="fill-white sm:fill-black"
                      strokeWidth={0.5}
                      size={20}
                    />
                  </div>
                  <Link href="https://www.instagram.com/vestido_nation/">
                    {' '}
                    <div className="sm:rounded-full sm:bg-white sm:p-2  cursor-pointer">
                      <FaInstagram
                        className="sm:hidden fill-white sm:fill-black"
                        strokeWidth={0.5}
                        size={20}
                      />
                    </div>{' '}
                  </Link>
                  <div className="sm:rounded-full sm:bg-white sm:p-2  cursor-pointer">
                    <Link href="https://www.linkedin.com/company/vestidonation/">
                      <FaLinkedinIn
                        className="fill-white "
                        strokeWidth={0.5}
                        size={20}
                      />
                    </Link>
                  </div>
                </div>
                <div className="flex divide-x divide-gray-200 text-white gap-3 items-center justify-self-center mt-8">
                  <div className=""> Available on</div>
                  <div className="flex gap-3 items-center justify-around text-xl pl-3">
                    <IoLogoAndroid />
                    <IoLogoApple />
                  </div>
                </div>
              </div>

              {/* <div className='absolute bottom-2'>Available on:</div> */}
            </TabsList>
          </div>
        ) : null}

        <div className={`w-full md:basis-4/5 px-1 md:px-4 `}>
          {/*${isSmallScreen && selectedNav ? '' : 'hidden'}*/}
          <TabContent value="orders" label="All Orders">
            <OrdersView />
          </TabContent>

          <TabContent value="profile" label="Profile Details">
            <Profile />
          </TabContent>
          <TabsContent value="addresses" className="relative">
            {isSmallScreen && selectedNav && (
              <>
                <Button
                  className="bg-transparent text-white p-0 absolute -top-[2.5px] left-0"
                  onClick={() => setSelectedNav('')}
                >
                  <LuChevronLeft size={22} />
                </Button>
              </>
            )}
            <Addresses />
          </TabsContent>

          <TabContent value="t&c" label="Terms and Conditions">
            <TermsAndConditions />
          </TabContent>

          <TabContent value="privacy" label="Privacy Policy">
            <PrivacyPolicy />
          </TabContent>
          <TabContent value="faq" label="Frequently Asked Questions">
            <FAQ />
          </TabContent>
          <TabContent value="shipping" label="Shipping Policy">
            <ShippingPolicy />
          </TabContent>
          <TabContent value="return" label="Return & Exchange">
            <ReturnExchange />
          </TabContent>
          <TabContent value="contact" label="Return & Exchange">
            <ContactUs />
          </TabContent>
          <TabContent value="delete" label="Delete Account">
            <DeleteAccount />
          </TabContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProfileView;
