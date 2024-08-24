'use client';

import { useState } from 'react';
import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSendOTP } from '@vestido-ecommerce/auth';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@vestido-ecommerce/shadcn-ui/form';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const indianMobileRegex = /^[6-9]\d{9}$/;

const FormSchema = z.object({
  mobile: z
    .string()
    .regex(indianMobileRegex, 'Please enter a valid Indian mobile number'),
});

const AuthView: React.FC = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mobile: '',
    },
  });

  const { trigger } = useSendOTP();

  const [otpSent, setOtpSent] = useState(false);
  const [userExists, setUserExists] = useState(true);
  const [userMobile, setUserMobile] = useState('');

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await trigger({
      mobile: data.mobile,
    });
    setOtpSent(true);
    setUserMobile(data.mobile);
    if (response?.userExists !== undefined) {
      setUserExists(response.userExists);
    }
  }
  return (
    <Form {...form}>
      <div className="flex justify-center w-full h-screen items-center overflow-y-hidden">
        <div className="h-screen w-full bg-[#ddd4cd] basis-1/2 flex flex-col items-end justify-center p-10">
          <div className="absolute left-10 top-10">
            <Image
              src="/assets/white-logo.png"
              alt="Logo"
              width="360"
              height="70"
            />
          </div>
          <div className="text-7xl font-[200] z-10">

            <div>Your Style.</div>
            <div>Your Story.</div>
          </div>
          <div className="max-w-xl mt-10 text-right text-lg z-10">

            Every outfit tells a story — make yours unforgettable. <br />
            Dive into our collection and find the pieces that speak to you,
            <br /> from classic staples to the latest trends.
          </div>
        </div>
        <div className="basis-1/2 flex flex-col justify-center items-center bg-white ">
          <div className="absolute right-48 opacity-25">
            <Image
              src="/assets/image.jpg"
              alt="image"
              height={900}
              width={1200}
            ></Image>
          </div>
          {!otpSent && (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full md:w-1/2 space-y-6 bg-white z-10 p-10"
            >

              <div className="font-semibold text-2xl">Login / Signup</div>
              <hr />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 rounded-none"
                        placeholder="mobile"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full h-14 uppercase tracking-widest rounded-none"
              >
                Send OTP
              </Button>
            </form>
          )}
          <div className="w-full">
            {otpSent && userExists && <LoginForm mobile={userMobile} />}
          </div>
          <div className="w-full">
            {otpSent && userExists == false && (
              <SignupForm mobile={userMobile} />
            )}
          </div>
        </div>
      </div>
    </Form>
  );
};

export default AuthView;
