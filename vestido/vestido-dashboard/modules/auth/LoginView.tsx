'use client';

import { useState } from 'react';
import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
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
  FormMessage,
} from '@vestido-ecommerce/shadcn-ui/form';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { VestidoError } from '@vestido-ecommerce/utils';

import LoginForm from './LoginForm';

const indianMobileRegex = /^[6-9]\d{9}$/;

const FormSchema = z.object({
  mobile: z
    .string()
    .regex(indianMobileRegex, 'Please enter a valid Indian mobile number'),
});

const LoginView: React.FC = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mobile: '',
    },
  });

  const { trigger } = useSendOTP();
  const { toast } = useToast();

  const [otpSent, setOtpSent] = useState(false);
  const [userMobile, setUserMobile] = useState('');

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await trigger({
        mobile: data.mobile,
      });
      setOtpSent(true);
      setUserMobile(data.mobile);
    } catch (e) {
      if (e instanceof VestidoError) {
        if (e.name === 'UserNotFound') {
          form.setError('root', {
            message: e.message,
          });
          toast({
            title: 'Cannot Log In',
            description: e.message,
          });
        } else {
          form.setError('root', { message: e.message });
          toast({
            title: 'Error Logging In',
            description: e.message,
          });
        }
      }
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col justify-center items-center h-screen px-2 ">
        <Image
          src="/assets/black-logo.png"
          alt="Logo"
          width="204"
          height="40"
          className="mb-2"
        />
        <div className="p-2 md:p-4 lg:p-6 xl:p-10 bg-[#ddd4cd] w-full sm:w-5/6 md:w-2/3 xl:w-1/4 rounded-lg">
          {' '}
          <div className="font-semibold text-lg">Admin Login</div>
          <hr className="border-gray-400 my-5" />
          {!otpSent && (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile</FormLabel>
                    <FormControl>
                      <Input placeholder="mobile" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={otpSent} type="submit">
                Send OTP
              </Button>
            </form>
          )}
          {otpSent && <LoginForm mobile={userMobile} />}
        </div>
      </div>
    </Form>
  );
};

export default LoginView;
