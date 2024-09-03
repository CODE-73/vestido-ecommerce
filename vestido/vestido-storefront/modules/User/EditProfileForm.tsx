import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileGender } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useProfile, useUpdateProfile } from '@vestido-ecommerce/auth/client';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';
import { Label } from '@vestido-ecommerce/shadcn-ui/label';
import { RadioGroup } from '@vestido-ecommerce/shadcn-ui/radio-group';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';

import { InputElement } from '../../forms/input-element';
import { RadioGroupItem } from '../Checkout/CustomerAddressSelector';
const indianMobileRegex = /^[6-9]\d{9}$/;

const UpdateProfileSchema = z.object({
  firstName: z.string().min(2, { message: 'Name  too short' }).nullish(),
  lastName: z.string().min(2, { message: 'Name  too short' }).nullish(),
  mobile: z
    .string()
    .min(1, 'Mobile is required')
    .regex(indianMobileRegex, 'Please enter a valid Indian mobile number'),

  gender: z.nativeEnum(ProfileGender).default('FEMALE' satisfies ProfileGender),
  email: z
    .string()
    .email({
      message: 'Invalid email address',
    })
    .nullish(),
});

export type UpdateProfileForm = z.infer<typeof UpdateProfileSchema>;

const EditProfileForm: React.FC = () => {
  const { data } = useProfile();
  const profile = data?.data;
  console.log('profile is', profile);
  const { toast } = useToast();

  const form = useForm<UpdateProfileForm>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      mobile: profile?.mobile ?? '',
      gender: profile?.gender,
      email: profile?.email,
    },
  });
  const { firstName } = form.getValues();
  console.log('values', firstName);
  const { trigger } = useUpdateProfile();
  const handleSubmit = async (data: UpdateProfileForm) => {
    try {
      await trigger({
        firstName: data.firstName ?? '',
        lastName: data.lastName ?? '',
        gender: data.gender ?? '',
        mobile: data.mobile ?? '',
        email: data.email ?? '',
      });
      toast({
        title: 'Profile Updated Successfully',
      });
    } catch (e) {
      console.error('Error updating profilr:', e);
    }
  };
  return (
    <div className=" flex items-center justify-center">
      <div className="w-full p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl text-white font-semibold mb-6">Edit Details</h2>
        <Form {...form}>
          {' '}
          <form onSubmit={form.handleSubmit(handleSubmit)} className="">
            {/* Mobile Number */}
            <div className="mb-4">
              <InputElement
                name="mobile"
                label="Mobile"
                placeholder="Mobile Number"
                className="bg-gray-400 text-black border border-gray-600 "
              />
            </div>

            {/* First Name */}
            <div className="mb-4">
              <InputElement
                name="firstName"
                label="First Name"
                placeholder="First Name"
                className="bg-gray-400 text-black border border-gray-600"
              />
              <InputElement
                name="lastName"
                label="last Name"
                placeholder="last Name"
                className="bg-gray-400 text-black border border-gray-600"
              />
            </div>

            <div className="mb-4">
              <InputElement
                name="email"
                label="Email"
                placeholder="Email Address"
                className="bg-gray-400 text-black border border-gray-600"
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <RadioGroup defaultValue={profile?.gender} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="MALE" id="r1" />
                  <Label htmlFor="r1" className="text-white">
                    Male
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FEMALE" id="r2" />
                  <Label htmlFor="r2" className="text-white">
                    Female
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full bg-[#48cab2] text-white py-2 px-4 rounded-md hover:bg-[#48cab2] focus:outline-none focus:ring-2 focus:ring-[#48cab2]"
            >
              Save Details
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProfileForm;
