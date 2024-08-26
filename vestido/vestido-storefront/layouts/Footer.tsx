import { FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { IoLogoAndroid, IoLogoApple } from 'react-icons/io';
import { LuFacebook, LuInstagram } from 'react-icons/lu';
const Footer = () => {
  return (
    <div
      className="bg-black flex justify-between items-center text-[#f5f5f5] py-7 font-light px-3 xl:px-32"
      style={{
        boxShadow: '0 -20px 25px -5px rgba(55, 65, 81, 0.7)', // Mimicking shadow-lg shadow-gray-700/50
      }}
    >
      <div className="text-xs">
        Copyright @ Vestido Nation - All Rights Reserved.
      </div>
      <div className="flex gap-3 ">
        {' '}
        <div className="rounded-full bg-white p-1">
          <LuFacebook fill="black" size={24} strokeWidth={0.5} />
        </div>
        <div className="rounded-full bg-white p-1">
          <FaXTwitter fill="black" size={24} strokeWidth={0.5} />
        </div>
        <div className="rounded-full bg-white p-1">
          <LuInstagram fill="black" size={24} strokeWidth={0.5} />
        </div>
        <div className="rounded-full bg-white p-1">
          <FaLinkedinIn fill="black" size={24} strokeWidth={0.5} />
        </div>
      </div>
      <div className="flex divide-x divide-gray-700 text-white gap-3 items-center">
        <div className="text-sm"> Available on</div>
        <div className="flex gap-1 items-center px-3">
          <IoLogoAndroid size={28} />
          <IoLogoApple size={28} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
