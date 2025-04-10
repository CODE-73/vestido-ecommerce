import Link from 'next/link';

import { FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { IoLogoAndroid, IoLogoApple } from 'react-icons/io';
import { LuFacebook, LuInstagram } from 'react-icons/lu';
const Footer = () => {
  return (
    <div
      className="bg-black grid  grid-cols-2 sm:grid-cols-3  gap-5 justify-between items-center text-[#f5f5f5] py-2 mt-1 sm:py-7 font-light px-3 xl:px-32"
      style={{
        boxShadow: '0 -20px 25px -5px rgba(55, 65, 81, 0.6)', // Mimicking shadow-lg shadow-gray-700/50
      }}
    >
      <div className="text-[8px] md:text-xs hidden sm:block">
        Copyright @ Vestido Nation - All Rights Reserved.
      </div>
      <div className="flex gap-3 justify-self-center sm:justify-self-start md:justify-self-center">
        {' '}
        <Link href="https://www.facebook.com/people/Vestido-Nation/61554017931370/?mibextid=ZbWKwL">
          <div className="sm:rounded-full sm:bg-white sm:p-2 text-sm md:text-xl cursor-pointer">
            <LuFacebook
              strokeWidth={0.5}
              className="fill-white sm:fill-black"
            />
          </div>
        </Link>
        <div className="sm:rounded-full sm:bg-white sm:p-2 text-sm md:text-xl cursor-pointer">
          <FaXTwitter className="fill-white sm:fill-black" strokeWidth={0.5} />
        </div>
        <Link href="https://www.instagram.com/vestido_nation/">
          {' '}
          <div className="sm:rounded-full sm:bg-white sm:p-2 text-sm md:text-xl cursor-pointer">
            <FaInstagram
              className="sm:hidden fill-white sm:fill-black"
              strokeWidth={0.5}
            />

            <LuInstagram
              className="hidden sm:block fill-white sm:fill-black"
              strokeWidth={0.5}
            />
          </div>{' '}
        </Link>
        <div className="sm:rounded-full sm:bg-white sm:p-2 text-sm md:text-xl cursor-pointer">
          <Link href="https://www.linkedin.com/company/vestidonation/">
            <FaLinkedinIn
              className="fill-white sm:fill-black"
              strokeWidth={0.5}
            />
          </Link>
        </div>
      </div>
      <div className="flex divide-x divide-gray-700 text-white gap-[1px] md:gap-3 items-center justify-self-center md:justify-self-end">
        <div className="text-xs md:text-sm"> Available on</div>
        <div className="flex gap-1 items-center md:px-3 text-lg md:text-2xl">
          <IoLogoAndroid />
          <IoLogoApple />
        </div>
      </div>{' '}
      <div className="text-[8px] sm:hidden justify-self-center col-span-2">
        Copyright @ Vestido Nation - All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
