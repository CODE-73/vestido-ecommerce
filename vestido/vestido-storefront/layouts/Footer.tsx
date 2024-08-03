import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  LuFacebook,
  LuInstagram,
  LuMail,
  LuTwitter,
  LuYoutube,
} from 'react-icons/lu';

import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';

import useIsMobile from '../hooks/useIsMobile';
import CollapsableFooterSection from '../modules/HomePage/CollapsableFooterSection/CollapsableFooterSection';

const Footer = () => {
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState('Info');
  const router = useRouter();

  const currentPath = router.pathname;

  if (isMobile && currentPath.startsWith('/products/')) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-12 text-[#888888] text-md p-7 2xl:px-72 py-14 bg-zinc-100 ">
        <div className="sm:col-span-4 xl:col-span-2">
          <CollapsableFooterSection
            title="Info"
            collapsible={isMobile}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          >
            <Link href="/about-us">About Us</Link>
            <Link href="/shipping-and-returns">Shipping and Returns</Link>
            <Link href="/contact-us">Contact Us</Link>
            <Link href="/404-Page">404 Page</Link>
            <Link href="/maintenance">Maintenance</Link>
          </CollapsableFooterSection>
        </div>
        <div className="sm:col-span-4 xl:col-span-2">
          <CollapsableFooterSection
            title="Our Policies"
            collapsible={isMobile}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          >
            <Link href="/faqs">FAQs</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
          </CollapsableFooterSection>
        </div>
        <div className="sm:col-span-4 xl:col-span-2">
          <CollapsableFooterSection
            title="Order"
            collapsible={isMobile}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          >
            <Link href="/my-account">My Account</Link>
            <Link href="/view-cart">View Cart</Link>
            <Link href="/wishlist">Wishlist</Link>
            <Link href="/compare">Compare</Link>
          </CollapsableFooterSection>
        </div>
        <div className="sm:col-span-6 xl:col-span-3 sm:pt-10 xl:pt-0">
          <CollapsableFooterSection
            title="Warehouse"
            collapsible={isMobile}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          >
            <div className="line-clamp-3">
              <p>2548 Broaddus Maple Court Avenue, Madisonville KY4783,</p>
              <p>United States of America</p>
            </div>
            <div className="flex flex-row text-[#333] text-base pt-5">
              <div className="text-gray-500">Call Us:</div>
              <b className="font-extrabold">1–234–5678901</b>
            </div>
            <div className="text-sm">Mon-Sun: 9:00am - 9:00pm</div>
          </CollapsableFooterSection>
        </div>

        <div className="space-y-4 text-gray-500 sm:col-span-6 xl:col-span-3 sm:pt-10 xl:pt-0">
          <h1 className="font-bold text-base text-[#333]">
            Subscribe to Our Newsletter!
          </h1>
          <div className="relative">
            <Input
              className="px-4 py-2 pr-10 w-4/5 border rounded-md placeholder:font-bold placeholder:text-gray-500"
              type="email"
              placeholder="Enter your e-mail"
            />
            <LuMail className="absolute top-1/2 transform -translate-y-1/2 right-20" />
          </div>
          <div className="text-sm w-3/4 leading-relaxed">
            By entering your email, you agree to our Terms of Service and
            Privacy Policy.
          </div>
          <div className="flex flex-row space-x-4 opacity-50">
            <div className="text-black font-bold text-base "> Follow Us:</div>
            <LuFacebook />
            <LuTwitter />
            <LuInstagram />
            <LuYoutube />
          </div>
        </div>
      </div>
      <div className="flex flex-col  md:flex-row justify-center items-center bg-zinc-100 gap-4 pb-10">
        <Button className="flex gap-4 h-auto">
          <Image src="/assets/gplay.png" alt="G-Play" width="50" height="50" />
          <div className="flex flex-col items-start">
            <div className="uppercase">get it on</div>
            <div className="text-2xl">Google Play</div>
          </div>
        </Button>
        <Button className="flex gap-4 h-auto">
          <Image src="/assets/apple.png" alt="G-Play" width="50" height="50" />
          <div className="flex flex-col items-start">
            <div>Available on the</div>
            <div className="text-3xl">App Store</div>
          </div>
        </Button>
      </div>

      <div className="flex justify-center">
        <div className="col-md-12">
          <p>&copy; 2024 Vestido Nation. All Rights Reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
