'use client';

import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useLogin } from '@vestido-ecommerce/auth/client';
import { useAuth } from '@vestido-ecommerce/auth/client';
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
import { VestidoError } from '@vestido-ecommerce/utils';

interface Props {
  mobile: string;
}

const indianMobileRegex = /^[6-9]\d{9}$/;

const FormSchema = z.object({
  mobile: z
    .string()
    .regex(indianMobileRegex, 'Please enter a valid Indian mobile number'),
  otp: z.string().refine((otp) => otp.length === 6, {
    message: 'OTP must be exactly 6 digits long',
    path: ['otp'],
  }),
});

const LoginForm: React.FC<Props> = ({ mobile }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mobile: mobile,
      otp: '',
    },
  });

  const { trigger } = useLogin();
  const { onLogin } = useAuth();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const r = await trigger({
        mobile: data.mobile,
        otp: data.otp,
      });
      if (r.success) {
        onLogin(r.data.user, r.data.token);
        router.push('/');
      } else {
        form.setError('otp', {
          message: 'Invalid OTP',
        });
      }
    } catch (error) {
      if (error instanceof VestidoError) {
        if (error.name === 'OTPVerificationFailed') {
          form.setError('otp', {
            // message: error.message || 'Invalid OTP. Please try again.',
            message: 'Invalid OTP. Please try again.',
          });
        } else {
          form.setError('root', {
            message: error.message,
          });
        }
      } else {
        // Fallback for unexpected errors
        form.setError('otp', {
          message: 'An unexpected error occurred',
        });
      }

      console.error('Login failed:', error);
    }
  }

  return (
    <Form {...form}>
      <div className="flex flex-col justify-center items-center">
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
                  <Input disabled placeholder="mobile" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP</FormLabel>
                <FormControl>
                  <Input placeholder="otp" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </Form>
  );
};

export default LoginForm;
