import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { clsx } from 'clsx';
import { LuCheck } from 'react-icons/lu';

import { Button } from '@vestido-ecommerce/shadcn-ui/button';

const DeleteAccount: React.FC = () => {
  return (
    <div className="md:px-10">
      <div className="font-semibold text-lg py-4 hidden md:block">
        Delete Account
      </div>{' '}
      <hr className="border-gray-600 hidden md:block" />
      <div className="my-10 flex justify-center">
        <Image
          src="/assets/broken-heart.png"
          alt=""
          width={150}
          height={150}
        ></Image>
      </div>
      <div className="font-semibold text-sm md:text-lg py-4">
        Is this goodbye? Are you sure you don&apos;t want to reconsider?
      </div>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <span className="font-semibold md:font-bold">
            You&apos;ll lose your order history, saved details,and all other
            benefits.
          </span>
          <p className="text-[12px] md:text-sm mt-4 md:mt-auto">
            Any account-related benefits will be forfeited once the account is
            deleted and will no longer be available to you. You cannot recover
            the same. However, you can always create a new account. By deleting
            your account, you acknowledge you have read our&nbsp;
            <Link href="/privacy-policy" className="text-blue-600">
              Privacy Policy
            </Link>
            .
          </p>
        </li>
        <li>
          <span className="font-semibold md:font-bold text-base">
            Any pending orders, exchanges, returns or refunds will no longer be
            accessible via your account.
          </span>
          <p className="text-[12px] md:text-sm mt-4 md:mt-auto">
            VestidoNation will try to complete the open transactions in the next
            30 days on a best effort basis. However, we cannot ensure tracking &
            traceability of transactions once the account is deleted.
          </p>
        </li>
        <li className="text-[12px] md:text-sm">
          We may not extend New User coupon if an account is created with the
          same mobile number or email id.
        </li>
        <li className="text-[12px] md:text-sm">
          We may refuse or delay deletion in case there are any pending
          grievances related to orders, shipments, cancellations or any other
          services offered by VestidoNation.
        </li>
        <li className="text-[12px] md:text-sm">
          VestidoNation may retain certain data for legitimate reasons such as
          security, fraud prevention, future abuse, regulatory compliance
          including exercise of legal rights or comply with legal orders under
          applicable laws.
        </li>
      </ul>
      <div className="py-4">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="ml-2 text-sm">
          I agree to all the terms and conditions*
        </label>
      </div>
      <div className="flex space-x-4">
        <Button className="w-1/2  h-12 text-xs md:text-lg rounded-none uppercase border border-4 border-[#48cab2] opacity-70 text-[#48cab2] bg-transparent hover:bg-transparent">
          Delete Anyway
        </Button>
        <Button className="w-1/2 bg-[#48cab2] h-12 text-xs md:text-lg text-white uppercase rounded-none">
          Keep Account
        </Button>
      </div>
    </div>
  );
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={clsx(
      'peer h-4 w-4 shrink-0 rounded-sm border border-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={clsx('flex items-center justify-center text-white')}
    >
      <LuCheck className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default DeleteAccount;
