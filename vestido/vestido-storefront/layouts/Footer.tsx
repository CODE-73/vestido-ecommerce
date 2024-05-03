import React from 'react';
import { Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';
const Footer = () => {
  return (
    <>
      <div className="flex justify-around bg-zinc-100 py-20 ">
        <div className="space-y-4 flex flex-col text-gray-500">
          <h1 className="font-black text-xl text-black">Info</h1>
          <a href="/about-us">About Us</a>
          <a href="/shipping-and-returns">Shipping and Returns</a>
          <a href="/contact-us">Contact Us</a>
          <a href="/404-Page">404 Page</a>
          <a href="/maintenance">Maintenance</a>
        </div>
        <div className="space-y-4 flex flex-col text-gray-500">
          <h1 className="font-bold text-xl text-black">Our Policies</h1>
          <a href="/faqs">FAQs</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/cookie-policy">Cookie Policy</a>
          <a href="/terms-and-conditions">Terms and Conditions</a>
        </div>
        <div className="space-y-4 flex flex-col text-gray-500">
          <h1 className="font-bold text-xl text-black">Order</h1>
          <a href="/my-account">My Account</a>
          <a href="/view-cart">View Cart</a>
          <a href="/wishlist">Wishlist</a>
          <a href="/compare">Compare</a>
        </div>
        <div className="space-y-4 text-gray-500">
          <h1 className="font-bold text-xl text-black">Store</h1>
          <div className="line-clamp-3">
            <p> 2548 Broaddus Maple Court Avenue, Madisonville KY 4783,</p>{' '}
            United States of America
          </div>
          <div className="text-black">
            Call Us:<b>1–234–5678901</b>
          </div>
          <div>Mon-Sun: 9:00am - 9:00pm</div>
        </div>
        <div className="space-y-4 text-gray-500">
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
      <div className="flex justify-center ">
        <div className="col-md-12">
          <p>
            &copy; {new Date().getFullYear()} Vestido Nation. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
