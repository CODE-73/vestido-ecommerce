import React from 'react';
import Image from 'next/image';

import { LuFacebook, LuInstagram, LuTwitter, LuYoutube } from 'react-icons/lu';

import BackgroundVideo from './background-video';
const ComingSoon = () => {
  return (
    <div className="h-screen w-screen grid lg:grid-cols-2 grid-cols-1">
      <div className="relative lg:col-span-1 md:col-span-1 sm:col-span-1 flex flex-col justify-center  sm:justify-center z-10 text-white ">
        <BackgroundVideo />
        <div className="flex flex-col w-full h-[30vh]  justify-center items-center space-y-6">
          <Image
            className="h-auto w-10 "
            src="/images/Logo.png"
            alt="Logo"
            width={100}
            height={100}
          />
          <Image
            className="h-auto w-40"
            src="/images/NameLogo.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </div>
        <div className="h-[50vh] text-center md:col-span-9 lg:col-span-8">
          <div className="text-xl">Stay Tuned</div>
          <div className="text-xl">Our New Website Is</div>
          <div
            className="text-5xl font-normal tracking-widest p-10 pb-5"
            style={{ fontFamily: 'Roboto', fontWeight: 'normal' }}
          >
            COMING SOON
          </div>
          <p
            className="p-5"
            style={{ fontFamily: 'Roboto', fontWeight: 'normal' }}
          >
            We are currently working on awesome new site. Stay <br />
            tuned far more information. Subscribe to our newsletter to
            <br />
            stay updated on our progress
          </p>
          <div className="flex gap-3 justify-center">
            <a href="https://www.instagram.com/vestido_nation?igsh=MTZkdXQ0andwdXBibg==">
              <LuInstagram />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61554017931370&mibextid=ZbWKwL">
              <LuFacebook />
            </a>
            <LuYoutube />
            <a href="https://x.com/Vestido_Nation?t=FuI3fcJs4dUj18JEhhlH3w&s=09">
              <LuTwitter />
            </a>
          </div>
        </div>
        <div className="h-[20vh] flex justify-center items-center">
          <form action="#">
            <div className="flex flex-row  self-end outline outline-2  outline-slate-300 h-10 ">
              <input
                type="email"
                className="text-black pl-3 "
                placeholder="Your Email Address"
              />
              <div className="">
                <button
                  className="h-10 w-24 btn btn-outline-primary-2 bg-stone-400"
                  type="submit"
                >
                  <span>SUBSCRIBE</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Image
        className=" w-full h-screen hidden lg:block"
        src="/images/landing.jpg"
        alt="Image"
        width={200}
        height={200}
      />
    </div>
  );
};
export default ComingSoon;
