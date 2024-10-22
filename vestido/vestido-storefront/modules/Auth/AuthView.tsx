'use client';

import { useState } from 'react';
import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMediaQuery } from '@react-hook/media-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSendOTP } from '@vestido-ecommerce/auth/client';
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

  const { trigger, isMutating } = useSendOTP();

  const [otpSent, setOtpSent] = useState(false);
  const [userExists, setUserExists] = useState(true);
  const [userMobile, setUserMobile] = useState('');

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { data: { userExists } = { userExists: false } } = await trigger({
      mobile: data.mobile,
    });
    setOtpSent(true);
    setUserMobile(data.mobile);
    if (userExists !== undefined) {
      setUserExists(userExists);
    }
  }

  const isMdAndAbove = useMediaQuery('(min-width: 768px)');
  return (
    <Form {...form}>
      {isMdAndAbove ? (
        <div className="flex justify-center w-full h-screen items-center overflow-y-hidden">
          <div className="h-screen w-full bg-[#ddd4cd] basis-1/2 flex flex-col items-end justify-center p-10">
            <div className="absolute top-3 left-3 xl:left-10 xl:top-10">
              <div className=" xl:hidden">
                <Image
                  src="/assets/white-logo.png"
                  alt="Logo"
                  width={204}
                  height={40}
                />
              </div>
              <div className="hidden xl:block">
                <Image
                  src="/assets/white-logo.png"
                  alt="Logo"
                  width={360}
                  height={70}
                />
              </div>
            </div>
            <div className="text-2xl font-semibold lg:text-4xl 2xl:text-7xl lg:font-[200] z-10 text-right">
              <h3 className="font-light">Your Style.</h3>
              <h3 className="font-light">Your Statement.</h3>
            </div>
            <div className="max-w-xl mt-10 text-right  xl:text-lg z-10 ">
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
                className="w-full md:w-[90%] xl:w-[80%] 2xl:w-1/2 space-y-6 bg-white z-10 p-10"
              >
                <h4 className="xl:text-2xl">Login / Signup</h4>
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
                  disabled={
                    isMutating ||
                    form.formState.isSubmitting ||
                    !form.formState.isValid
                  }
                  className="w-full h-14 uppercase tracking-widest rounded-none"
                >
                  Send OTP
                </Button>
              </form>
            )}
            <div className="w-full">
              {otpSent && userExists && (
                <LoginForm
                  mobile={userMobile}
                  onBackClick={() => setOtpSent(false)}
                />
              )}
            </div>
            <div className="w-full">
              {otpSent && userExists == false && (
                <SignupForm
                  mobile={userMobile}
                  onBackClick={() => setOtpSent(false)}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className=" h-screen w-screen flex flex-col items-center bg-[#ddd4cd]">
          <div className="sticky top-0 basis-1/4 w-full">
            {' '}
            <div className="absolute top-0 left-0 opacity-25 w-full">
              <Image
                src="/assets/image.jpg"
                alt="image"
                height={900}
                width={1200}
              ></Image>
            </div>
            <div className="flex flex-col  items-center px-10 pt-3">
              {' '}
              <Image
                src="/assets/black-logo.png"
                alt="Logo"
                width="204"
                height="40"
              />
              <div className="p-1  pt-12 flex flex-col items-center text-lg sm:text-xl">
                <div>Your Style.</div>
                <div>Your Statement.</div>
              </div>
            </div>{' '}
          </div>
          <div className="rounded-t-[3rem] basis-3/4 bg-white z-10 w-full max-w-[600px]">
            {!otpSent && (
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6 bg-transparent p-3 mt-20"
              >
                <div className="font-semibold">Login / Signup</div>
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
                  className="w-full h-10 uppercase tracking-widest rounded-none"
                >
                  Send OTP
                </Button>
              </form>
            )}
            <div className="w-full">
              {otpSent && userExists && (
                <LoginForm
                  onBackClick={() => setOtpSent(false)}
                  mobile={userMobile}
                />
              )}
            </div>
            <div className="w-full">
              {otpSent && userExists == false && (
                <SignupForm
                  mobile={userMobile}
                  onBackClick={() => setOtpSent(false)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Form>
  );
};

export default AuthView;
