import React, { useState } from 'react';
import { Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';
import CollapsableFooterSection from '../modules/HomePage/CollapsableFooterSection/CollapsableFooterSection';
import useIsMobile from '../hooks/useIsMobile';

const Footer = () => {
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState('Info');

  return (
    <>
      <div className="flex flex-col md:flex-row text-gray-500 p-7 lg:px-72 py-14 bg-zinc-100">
        <CollapsableFooterSection
          title="Info"
          collapsible={isMobile}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        >
          <a href="/about-us">About Us</a>
          <a href="/shipping-and-returns">Shipping and Returns</a>
          <a href="/contact-us">Contact Us</a>
          <a href="/404-Page">404 Page</a>
          <a href="/maintenance">Maintenance</a>
        </CollapsableFooterSection>
        <CollapsableFooterSection
          title="Our Policies"
          collapsible={isMobile}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        >
          <a href="/faqs">FAQs</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/cookie-policy">Cookie Policy</a>
          <a href="/terms-and-conditions">Terms and Conditions</a>
        </CollapsableFooterSection>
        <CollapsableFooterSection
          title="Order"
          collapsible={isMobile}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        >
          <a href="/my-account">My Account</a>
          <a href="/view-cart">View Cart</a>
          <a href="/wishlist">Wishlist</a>
          <a href="/compare">Compare</a>
        </CollapsableFooterSection>
        <CollapsableFooterSection
          title="Store"
          collapsible={isMobile}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        >
          <div className="line-clamp-3">
            <p>2548 Broaddus Maple Court Avenue, Madisonville KY 4783,</p>
            <p>United States of America</p>
          </div>
          <div className="text-black">
            Call Us:<b>1–234–5678901</b>
          </div>
          <div>Mon-Sun: 9:00am - 9:00pm</div>
        </CollapsableFooterSection>

        <div className="space-y-4 text-gray-500  ">
          <h1 className="font-bold text-xl text-black ">
            Subscribe to Our Newsletter!
          </h1>
          <div className="relative">
            <Input
              className="px-4 py-2 pr-10 w-full border rounded-md"
              type="email"
              placeholder="Enter your e-mail"
            />
            <Mail className="absolute top-1/2 transform -translate-y-1/2 right-3" />
          </div>
          <div>
            <p> By entering your email, you agree to </p>our Terms of Service
            and Privacy Policy.
          </div>
          <div className="flex flex-row space-x-4 opacity-50">
            <div className="text-black font-bold text-xl "> Follow Us:</div>
            <Facebook />
            <Twitter />
            <Instagram />
            <Youtube />
          </div>
        </div>
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
