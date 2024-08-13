'use client';

import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useLogin } from '@vestido-ecommerce/auth';
import { useAuth } from '@vestido-ecommerce/auth';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@vestido-ecommerce/shadcn-ui/form';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';

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
        mobile: data.mobile,
        otp: data.otp,
      });

      setToken(r.token);

      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (
    <Form {...form}>
      <div className="flex flex-col justify-center items-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full md:w-1/2 space-y-6 bg-white z-10 p-10"
        >
          <div className="font-semibold text-2xl">Login</div>
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
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 rounded-none"
                    placeholder="otp"
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
            Login
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default LoginForm;
