import React from 'react';

import { ProfileGender } from '@prisma/client';
import { z } from 'zod';

import { InputElement } from '../../forms/input-element';
const indianMobileRegex = /^[6-9]\d{9}$/;

const UpdateProfileSchema = z.object({
  firstName: z.string().min(2, { message: 'Name  too short' }),
  lastName: z.string().min(2, { message: 'Name  too short' }),
  mobile: z
    .string()
    .regex(indianMobileRegex, 'Please enter a valid Indian mobile number'),
  otp: z.string().refine((otp) => otp.length === 6, {
    message: 'OTP must be exactly 6 digits long',
    path: ['otp'],
  }),
  gender: z.nativeEnum(ProfileGender).default('FEMALE' satisfies ProfileGender),
  email: z.string().email({
    message: 'Invalid email address',
  }),
});

const EditProfileForm = () => {
  return (
    <div className=" flex items-center justify-center">
      <div className="w-full p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl text-white font-semibold mb-6">Edit Details</h2>

        <form>
          {/* Mobile Number */}
          <div className="mb-4">
            {/* <InputElement name="" label="Mobile" placeholder="Mobile Number" /> */}
            <label
              className="block text-sm font-medium text-white mb-2"
              htmlFor="mobile"
            >
              Mobile Number*
            </label>
            <input
              type="text"
              id="mobile"
              className="w-full px-4 py-2 text-gray-300 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#48cab2]"
              placeholder="Enter your mobile number"
            />
          </div>

          {/* First Name */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-white mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full px-4 py-2 text-gray-300 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#48cab2]"
              placeholder="Enter your first name"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-white mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full px-4 py-2 text-gray-300 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#48cab2]"
              placeholder="Enter your last name"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-white mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 text-gray-300 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#48cab2]"
              placeholder="Enter your email"
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <span className="block text-sm font-medium text-white mb-2">
              Gender
            </span>
            <div className="flex space-x-4">
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  className="form-radio h-4 w-4 text-pink-600 bg-gray-800 border-gray-700 focus:ring-[#48cab2]"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  className="form-radio h-4 w-4 text-pink-600 bg-gray-800 border-gray-700 focus:ring-[#48cab2]"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-[#48cab2] text-white py-2 px-4 rounded-md hover:bg-[#48cab2] focus:outline-none focus:ring-2 focus:ring-[#48cab2]"
          >
            Save Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
