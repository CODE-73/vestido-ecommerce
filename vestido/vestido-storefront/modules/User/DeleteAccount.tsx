import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Checkbox } from '@vestido-ecommerce/shadcn-ui/checkbox';

const DeleteAccount: React.FC = () => {
  return (
    <div className="md:px-10">
      <div className="font-semibold text-lg py-4 ">Delete Account</div> <hr />
      <div className="my-10 flex justify-center">
        <Image
          src="/assets/broken-heart.png"
          alt=""
          width={150}
          height={150}
        ></Image>
      </div>
      <div className="font-semibold text-lg py-4">
        Is this goodbye? Are you sure you don&apos;t want to reconsider?
      </div>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <span className="font-bold">
            You&apos;ll lose your order history, saved details,and all other
            benefits.
          </span>
          <p className="text-sm">
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
          <span className="font-bold">
            Any pending orders, exchanges, returns or refunds will no longer be
            accessible via your account.
          </span>
          <p className="text-sm">
            VestidoNation will try to complete the open transactions in the next
            30 days on a best effort basis. However, we cannot ensure tracking &
            traceability of transactions once the account is deleted.
          </p>
        </li>
        <li>
          We may not extend New User coupon if an account is created with the
          same mobile number or email id.
        </li>
        <li>
          We may refuse or delay deletion in case there are any pending
          grievances related to orders, shipments, cancellations or any other
          services offered by VestidoNation.
        </li>
        <li>
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
        <Button className="w-1/2  h-12 text-lg rounded-none uppercase border border-4 border-[#48cab2] opacity-70 text-[#48cab2] bg-transparent hover:bg-transparent">
          Delete Anyway
        </Button>
        <Button className="w-1/2 bg-[#48cab2] h-12 text-lg text-white uppercase rounded-none">
          Keep Account
        </Button>
      </div>
    </div>
  );
};

export default DeleteAccount;
