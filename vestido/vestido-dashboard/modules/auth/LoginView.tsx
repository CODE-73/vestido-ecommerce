'use client';

import { useState } from 'react';

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

  const [otpSent, setOtpSent] = useState(false);
  const [userMobile, setUserMobile] = useState('');

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await trigger({
      mobile: data.mobile,
    });
    setOtpSent(true);
    setUserMobile(data.mobile);
  }

  return (
    <Form {...form}>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="font-semibold text-lg">Login</div>
        {!otpSent && (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-1/4 space-y-6"
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
                </FormItem>
              )}
            />
            <Button type="submit">Send OTP</Button>
          </form>
        )}
        {otpSent && <LoginForm mobile={userMobile} />}
      </div>
    </Form>
  );
};

export default LoginView;
