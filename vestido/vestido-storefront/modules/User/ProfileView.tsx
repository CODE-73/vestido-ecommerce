import * as React from 'react';
import { useState } from 'react';

import { useProfile } from '@vestido-ecommerce/auth';

import ProfileOverview from './Overview';

const ProfileView: React.FC = () => {
  const { data } = useProfile();
  const currentUser = data?.data;
  const [selectedNav, setSelectedNav] = useState('Overview');
  console.log(selectedNav, 'selected');

  const renderContent = () => {
    switch (selectedNav) {
      case 'Overview':
        return <ProfileOverview user={currentUser} />;
      case 'Orders & Returns':
        return <div>Orders & Returns Content</div>;
      case 'Profile':
        return <div>Profile Content</div>;
      case 'Addresses':
        return <div>Addresses Content</div>;
      case 'Delete Account':
        return <div>Delete Account Content</div>;
      // case 'Terms of Use':
      //   return <div>Terms of Use Content</div>;
      // case 'Privacy Policy':
      //   return <div>Privacy Policy Content</div>;
      default:
        return <div>Overview Content</div>;
    }
  };
  return (
    <>
      <div className="hidden md:block 2xl:px-72 my-20">
        <div className="font-semibold text-lg">Account</div>
        <div className="uppercase  text-lg my-4">
          {currentUser?.firstName}&nbsp; {currentUser?.lastName}
        </div>
        <hr />
        {/* <div className="flex divide-x gap-3 ">
          <div className="basis-1/5 grid grid-col-1 space-y-10 divide-y">
            <div className="self-center justify-self-center h-full">
              Overview
            </div>
            <div className="self-center justify-self-center">Overview</div>

            <div className="self-center justify-self-center">Overview</div>
          </div>

          <div className="basis-4/5 px-4">content</div>
        </div> */}

        {/* Sidebar */}
        <div className="flex divide-x gap-3 ">
          <aside className="w-64 basis-1/4 p-4">
            <nav>
              <ul>
                <li className="mb-4">
                  <a
                    href="#"
                    className={`${
                      selectedNav === 'Overview'
                        ? 'text-[#48CAB2] font-semibold'
                        : 'text-gray-700 hover:text-[#48CAB2]'
                    }`}
                    onClick={() => setSelectedNav('Overview')}
                  >
                    Overview
                  </a>
                </li>
                <hr className="my-4" />
                <div className="mb-4 uppercase">ORDERS</div>
                <li className="mb-4">
                  <a
                    href="#"
                    className={`${
                      selectedNav === 'Orders & Returns'
                        ? 'text-[#48CAB2] font-semibold'
                        : 'text-gray-700 hover:text-[#48CAB2]'
                    }`}
                    onClick={() => setSelectedNav('Orders & Returns')}
                  >
                    Orders & Returns
                  </a>
                </li>
                <hr className="my-4" />
                <div className="mb-4 uppercase">ACCOUNT</div>
                <li className="mb-4">
                  <a
                    href="#"
                    className={`${
                      selectedNav === 'Profile'
                        ? 'text-[#48CAB2] font-semibold'
                        : 'text-gray-700 hover:text-[#48CAB2]'
                    }`}
                    onClick={() => setSelectedNav('Profile')}
                  >
                    Profile
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="#"
                    className={`${
                      selectedNav === 'Addresses'
                        ? 'text-[#48CAB2] font-semibold'
                        : 'text-gray-700 hover:text-[#48CAB2]'
                    }`}
                    onClick={() => setSelectedNav('Addresses')}
                  >
                    Addresses
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="#"
                    className={`${
                      selectedNav === 'Delete Account'
                        ? 'text-[#48CAB2] font-semibold'
                        : 'text-gray-700 hover:text-[#48CAB2]'
                    }`}
                    onClick={() => setSelectedNav('Delete Account')}
                  >
                    Delete Account
                  </a>
                </li>
              </ul>
              <hr className="my-4" />
              <div className="mb-4 uppercase">LEGAL</div>
              <ul>
                <li className="mb-4">
                  <a href="#" className="text-gray-700 hover:text-[#48CAB2]">
                    Terms of Use
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="text-gray-700 hover:text-[#48CAB2]">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </nav>
          </aside>
          <div className="basis-4/5 px-4">{renderContent()}</div>
        </div>
      </div>
      <div className="md:hidden">Hi</div>
    </>
  );
};

export default ProfileView;
