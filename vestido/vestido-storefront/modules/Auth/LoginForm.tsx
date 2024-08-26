'use client';

import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuChevronLeft } from 'react-icons/lu';
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
} from '@vestido-ecommerce/shadcn-ui/form';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';

type Props = {
  mobile: string;
  onBackClick: () => void;
};

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

const LoginForm: React.FC<Props> = ({ mobile, onBackClick }) => {
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

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <div className="flex flex-col justify-center items-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[600px]  z-10 "
        >
          <div className="flex items-center font-light hidden md:block">
            <LuChevronLeft size={28} strokeWidth={0.5} />
            Back
          </div>
          <div className="bg-white space-y-6   rounded-[3rem] md:rounded-none p-3 md:p-10 pt-10 md:pt-auto">
            <div className="font-semibold md:text-xl xl:text-2xl">Login</div>
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
              disabled={isSubmitting}
              type="submit"
              className="w-full h-10 md:h-14 uppercase tracking-widest rounded-none"
            >
              Login
            </Button>
            <Button
              type="button"
              onClick={onBackClick}
              className="w-full h-10 md:h-14 uppercase tracking-widest rounded-none bg-white border border-black text-black focus:text-white"
            >
              Go Back
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default LoginForm;
