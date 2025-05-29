import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

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

  const router = useRouter();
  const { tab } = router.query;
  const selectedNav = typeof tab === 'string' ? tab : '';
  const IsTabSelected = selectedNav.trim() !== '';

  const handleTabChange = (value: string) => {
    router.push(`/profile/${value}`, undefined, { shallow: true });
  };

  const isSmallScreen = useMediaQuery('(max-width:768px');
  // useEffect(() => {
  //   if (isSmallScreen) {
  //     setSelectedNav(''); // None for small screens
  //   } else {
  //     setSelectedNav('profile');
  //   }
  // }, [isSmallScreen]);

  const profileTabs = [
    { value: 'profile', label: 'PROFILE' },
    { value: 'orders', label: 'ORDERS & RETURNS' },
    { value: 'addresses', label: 'ADDRESSES' },
    { value: 't&c', label: 'TERMS OF USE' },
    { value: 'privacy', label: 'PRIVACY POLICY' },
    { value: 'faq', label: 'FAQs' },
    { value: 'shipping', label: 'SHIPPING POLICY' },
    { value: 'return', label: 'RETURN & EXCHANGE' },
    { value: 'help_center', label: 'HELP CENTER' },
    { value: 'delete', label: 'DELETE ACCOUNT' },
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
    // <TabsContent value={value} className="relative">
    //   {isSmallScreen && selectedNav && (
    //     <div className="flex justify-between items-center mb-10">
    //       <Button
    //         className="bg-transparent text-white p-0 flex items-center"
    //         onClick={() => router.back()}
    //       >
    //         <LuChevronLeft size={30} />
    //       </Button>
    //       <div className="font-semibold text-lg my-4 md:hidden">{label}</div>
    //       <div></div>
    //     </div>
    //   )}
    //   {children}
    // </TabsContent>
    <TabsContent value={value} className="relative h-full">
      {isSmallScreen && selectedNav && (
        <div className="sticky top-0 z-10 bg-black flex justify-between items-center py-4">
          <Button
            className="bg-transparent text-white p-0 flex items-center"
            onClick={() => router.back()}
          >
            <LuChevronLeft size={30} />
          </Button>
          <div className="font-semibold text-lg md:hidden">{label}</div>
          <div></div>
        </div>
      )}

      <div className="overflow-y-auto h-[calc(100vh-60px)] px-1 pb-4">
        {children}
      </div>
    </TabsContent>
  );

  return (
    <div className="2xl:px-72 my-20 text-white px-3 relative">
      <div className={`${IsTabSelected ? 'hidden md:block' : ''} `}>
        <h4 className="md:text-lg my-1 md:my-4 uppercase ">
          Hi&nbsp;&nbsp;{currentUser?.firstName}&nbsp;{currentUser?.lastName}!
        </h4>

        <hr className="border-gray-600" />
        <hr className="border-gray-600 md:hidden relative" />
      </div>

      <Tabs
        value={selectedNav}
        onValueChange={handleTabChange}
        className="flex flex-col md:flex-row divide-x text-xs md:text-base gap-1 md:gap-3 bg-transparent min-h-[280px] max-h-screen-minus-nav md:min-h-[500px]"
      >
        {!isSmallScreen || !selectedNav ? (
          <div className="h-full w-full md:w-64 md:basis-1/4 p-2 md:p-4">
            <TabsList className="h-full flex flex-col bg-transparent justify-start items-start text-slate-300 text-sm md:text-base">
              {profileTabs.map(({ value, label }) => (
                <Link key={value} href={`/profile/${value}`} passHref>
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="tracking-wide text-white bg-transparent border-none data-[state=active]:border-none data-[state=active]:underline underline-offset-800 data-[state=active]:bg-transparent data-[state=active]:text-white text-lg md:text-lg mb-1 px-0"
                  >
                    {label}
                  </TabsTrigger>
                </Link>
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

        <div className={`w-full md:basis-4/5 px-1 md:px-4 text-lg`}>
          {/*${isSmallScreen && selectedNav ? '' : 'hidden'}*/}
          <TabContent value="orders" label="ORDERS">
            <OrdersView />
          </TabContent>

          <TabContent value="profile" label="PROFILE ">
            <Profile />
          </TabContent>
          <TabContent value="addresses" label="ADDRESSES">
            <Addresses />
          </TabContent>

          <TabContent value="t&c" label="TERMS & CONDITIONS">
            <TermsAndConditions />
          </TabContent>

          <TabContent value="privacy" label="PRIVACY POLICY">
            <PrivacyPolicy />
          </TabContent>
          <TabContent value="faq" label="FREQUENTLY ASKED QUESTIONS">
            <FAQ />
          </TabContent>
          <TabContent value="shipping" label="SHIPPING POLICY">
            <ShippingPolicy />
          </TabContent>
          <TabContent value="return" label="RETURN & EXCHANGE">
            <ReturnExchange />
          </TabContent>
          <TabContent value="help_center" label="HELP CENTER">
            <ContactUs />
          </TabContent>
          <TabContent value="delete" label="DELETE ACCOUNT">
            <DeleteAccount />
          </TabContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProfileView;
