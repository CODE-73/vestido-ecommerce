import * as React from 'react';
import { useState } from 'react';

import { useProfile } from '@vestido-ecommerce/auth/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Skeleton } from '@vestido-ecommerce/shadcn-ui/skeleton';

import EditProfileForm from './EditProfileForm';

const Profile: React.FC = () => {
  const { data, isLoading } = useProfile();
  const currentUser = data?.data;
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className="md:px-10 lg:px-32">
      <div className="font-semibold text-lg py-4 hidden md:block uppercase">
        Profile Details
      </div>
      <hr className="hidden md:block border-gray-600 " />
      {isEditing ? (
        <EditProfileForm setIsEditing={setIsEditing} />
      ) : (
        <>
          <div className="flex gap-3 my-4 ">
            <div className="basis-1/2 ">Full Name &nbsp;</div>

            {isLoading ? (
              <Skeleton className="bg-neutral-700 rounded-lg w-[200px] h-[15px]" />
            ) : (
              <div className="uppercase basis-1/2">
                {currentUser?.firstName}&nbsp;{currentUser?.lastName}{' '}
              </div>
            )}
          </div>
          <div className="flex gap-3 my-4 ">
            <div className="basis-1/2">Mobile Number &nbsp;</div>
            {isLoading ? (
              <Skeleton className="bg-neutral-700 rounded-lg w-[200px] h-[15px]" />
            ) : (
              <div className="uppercase basis-1/2">{currentUser?.mobile}</div>
            )}
          </div>
          <div className="flex gap-3 my-4">
            <div className="basis-1/2">Email&nbsp;</div>
            {isLoading ? (
              <Skeleton className="bg-neutral-700 rounded-lg w-[200px] h-[15px]" />
            ) : (
              <div className="basis-1/2">
                {currentUser?.email ?? 'Not Added'}
              </div>
            )}
          </div>
          <div className="flex gap-3 my-4">
            <div className="basis-1/2">Gender&nbsp;</div>
            {isLoading ? (
              <Skeleton className="bg-neutral-700 rounded-lg w-[200px] h-[15px]" />
            ) : (
              <div className="basis-1/2">{currentUser?.gender}</div>
            )}
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            className="w-full uppercase h-14 bg-white text-lg text-black hover:bg-gray-300"
          >
            Edit Profile
          </Button>
        </>
      )}
    </div>
  );
};

export default Profile;
