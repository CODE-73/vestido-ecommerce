'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@vestido-ecommerce/shadcn-ui/form';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';
import { useSignup } from '@vestido-ecommerce/auth';
import { useAuth } from '@vestido-ecommerce/auth';
import { useRouter } from 'next/router';
import { InputElement } from '@vestido-ecommerce/shadcn-ui/form/InputElement';

interface Props {
  mobile: string;
}

const indianMobileRegex = /^[6-9]\d{9}$/;

const SignUpSchema = z.object({
  firstName: z.string().min(2, { message: 'Name  too short' }),
  lastName: z.string().min(2, { message: 'Name  too short' }),
  mobile: z
    .string()
    .regex(indianMobileRegex, 'Please enter a valid Indian mobile number'),
  otp: z.string().refine((otp) => otp.length === 6, {
    message: 'OTP must be exactly 6 digits long',
    path: ['otp'],
  }),
});

const SignupForm: React.FC<Props> = ({ mobile }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      mobile: mobile,
      otp: '',
    },
  });

  const { trigger } = useSignup();
  const { setToken } = useAuth();

  async function onSubmit(data: z.infer<typeof SignUpSchema>) {
    try {
      const r = await trigger({
        firstName: data.firstName,
        lastName: data.lastName,
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
          className="w-full space-y-6"
        >
          <InputElement
            name="firstName"
            label="First Name"
            placeholder="First Name"
          />
          <InputElement
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
          />

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
          <Button type="submit">SignUp</Button>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
