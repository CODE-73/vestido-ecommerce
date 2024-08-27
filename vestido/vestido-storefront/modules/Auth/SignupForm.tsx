'use client';

import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileGender } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { LuChevronLeft } from 'react-icons/lu';
import { z } from 'zod';

import { useAuth, useSignup } from '@vestido-ecommerce/auth/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@vestido-ecommerce/shadcn-ui/form';
import { InputElement } from '@vestido-ecommerce/shadcn-ui/form/InputElement';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';

import { RadioGroupElement } from '../../forms/radio-group-element';

type Props = {
  mobile: string;
  onBackClick: () => void;
};

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
  gender: z.nativeEnum(ProfileGender).default('FEMALE' satisfies ProfileGender),
  email: z.string().email({
    message: 'Invalid email address',
  }),
});
const SignupForm: React.FC<Props> = ({ mobile, onBackClick }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      mobile: mobile,
      otp: '',
      gender: 'FEMALE',
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
          className="w-full xl:w-3/4  z-10  max-w-[600px]  "
        >
          {' '}
          <div className="flex items-center font-light hidden md:block">
            <LuChevronLeft size={28} strokeWidth={0.5} />
            Back
          </div>
          <div className="space-y-6 bg-white md:rounded-none  p-3 md:p-10 rounded-[3rem] pt-10 md:pt-auto">
            {' '}
            <div className="font-semibold md:text-xl xl:text-2xl">Signup</div>
            <hr />
            <InputElement
              name="firstName"
              label="First Name"
              placeholder="First Name"
              className="h-12 rounded-none"
            />
            <InputElement
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              className="h-12 rounded-none"
            />
            <InputElement
              name="email"
              label="Email"
              placeholder="Email"
              className="h-12 rounded-none"
            />
            <RadioGroupElement
              name="gender"
              label="Gender"
              control={form.control}
              options={[
                { label: 'Male', value: 'MALE' },
                { label: 'Female', value: 'FEMALE' },
              ]}
              wrapperClassName="flex space-x-8"
            />
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
              className="w-full h-10 md:h-14 uppercase tracking-widest rounded-none"
            >
              SignUp
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

export default SignupForm;
