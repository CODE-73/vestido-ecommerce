import * as React from 'react';

import { useProfile } from '@vestido-ecommerce/auth/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';

const Profile: React.FC = () => {
  const { data } = useProfile();
  const currentUser = data?.data;

  return (
    <div className="md:px-10 lg:px-32">
      <div className="font-semibold text-lg py-4 hidden md:block">
        Profile Details
      </div>
      <hr className="border-gray-600 " />
      <div className="flex gap-3 my-4 ">
        <div className="basis-1/2 ">Full Name &nbsp;</div>
        <div className="uppercase basis-1/2">
          {currentUser?.firstName}&nbsp;{currentUser?.lastName}
        </div>
      </div>
      <div className="flex gap-3 my-4 ">
        <div className="basis-1/2">Mobile Number &nbsp;</div>
        <div className="uppercase basis-1/2">{currentUser?.mobile}</div>
      </div>
      <div className="flex gap-3 my-4">
        <div className="basis-1/2">Email&nbsp;</div>
        <div className="basis-1/2">{currentUser?.email ?? 'Not Added'}</div>
      </div>
      <div className="flex gap-3 my-4">
        <div className="basis-1/2">Gender&nbsp;</div>
        <div className="basis-1/2">MALE</div>
      </div>
      <Button className="w-full uppercase h-14 bg-[#48cab2] text-lg">
        Edit Profile
      </Button>
    </div>
  );
};

export default Profile;
