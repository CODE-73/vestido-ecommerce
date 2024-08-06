import { Profile } from '@prisma/client';
import { AiOutlineUser } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { PiPackage } from 'react-icons/pi';

import { Button } from '@vestido-ecommerce/shadcn-ui/button';

type OverviewProps = {
  user: Profile | undefined;
};

const nav_items = [
  { title: 'Orders', icon: <PiPackage size={32} />, link: 'Orders & Returns' },
  { title: 'Wishlist', icon: <FaRegHeart size={32} /> },
  { title: 'Addresses', icon: <MdLocationOn size={32} />, link: 'Addresses' },
  {
    title: 'Profile Details',
    icon: <AiOutlineUser size={32} />,
    link: 'Profile',
  },
];

const ProfileOverview: React.FC<OverviewProps> = ({ user }) => {
  return (
    <div className="grid grid-cols-4 mt-3  gap-4 justify-center items-center">
      <div className="flex items-center justify-between col-span-4 border border-1 border-stone-300 shadow p-10">
        <div className="flex gap-2 items-center text-xl font-semibold">
          <div className="h-20 w-20 flex border border-1 justify-center items-center ">
            <AiOutlineUser size={40} />
          </div>
          {user?.email ?? user?.mobile ?? user?.firstName}
        </div>
        <Button>Edit Profile</Button>
      </div>
      {nav_items.map((nav_item, index) => (
        <div
          key={index}
          className="cursor flex gap-2 justify-center items-center border border-2  hover:border-[#48CAB2] border-stone-300 shadow py-24 text-xl font-semibold text-gray-500  hover:text-[#48CAB2] cursor-pointer"
          //   onClick={() => setSelectedNav('Overview')}
        >
          {nav_item.icon} {nav_item.title}
        </div>
      ))}
    </div>
  );
};

export default ProfileOverview;
