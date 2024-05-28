'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from 'libs/shadcn-ui/src/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from 'libs/shadcn-ui/src/ui/form';
import { Input } from 'libs/shadcn-ui/src/ui/input';
import { useLogin } from '@vestido-ecommerce/auth';
import { useAuth } from 'libs/auth/src/providers/AuthProvider';
import { useRouter } from 'next/router';

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
  const { setToken } = useAuth();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const r = await trigger({
        mobileNumber: data.mobile,
        otp: data.otp,
      });
      if (r.success) {
        setToken(r.token);
        console.log('token is', r.token);

        router.push('/');
      } else {
        form.setError('otp', {
          message: 'Invalid OTP',
        });
      }
    } catch (error) {
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
                  <Input placeholder="mobile" {...field} />
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
