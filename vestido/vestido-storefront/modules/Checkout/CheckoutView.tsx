import * as React from 'react';
import Image from 'next/image';
import { Checkbox } from '@vestido-ecommerce/shadcn-ui/checkbox';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@vestido-ecommerce/shadcn-ui/select';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Search } from 'lucide-react';
// import { Label } from '@vestido-ecommerce/shadcn-ui/label';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
// import { useState } from 'react';
import { InputElement } from '@vestido-ecommerce/shadcn-ui/form/InputElement';
import { useCart } from '@vestido-ecommerce/items';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

const formSchema = z.object({
  email: z.string().email(),
});
const CheckoutView: React.FC = () => {
  // const [selectedOption, setSelectedOption] = useState('default');
  // const handleOptionChange = (value: string) => {
  //   setSelectedOption(value);
  // };
  const { data: cartItems } = useCart();

  const totalPrice =
    cartItems?.data.reduce((total, item) => {
      return total + item.qty * item.item.price;
    }, 0) ?? 0;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
  return (
    <>
      <div className="text-lg tracking-wide text-gray-300 text-center font-semibold my-12 uppercase">
        <span className="text-black">Cart ----- </span>
        <span className="text-[#48CAB2] text-2xl underline decoration-4 underline-offset-3">
          Address
        </span>
        ----- Payment
      </div>
      <div className=" flex flex-col lg:flex-row items-start ">
        <div className="basis-3/4 p-10 border-2 border-r-gray-300">
          <div className="flex flex-row">
            <div className="text-2xl">Contact</div>
            <button className="ml-auto underline text-sky-700">Log in</button>
          </div>
          <Form {...form}>
            <InputElement
              name="email"
              type="email"
              className="h-12 pl-3 rounded-md my-4"
              placeholder="Email or mobile phone number"
            />

            <div className="text-2xl mt-7">Delivery</div>

            <div className="flex flex-row space-x-3 h-12 my-5 ">
              <InputElement
                name="firstName"
                type="text"
                className="pl-3 "
                placeholder="First name (optional)"
              />
              <InputElement
                name="lastName"
                type="text"
                className="pl-3 "
                placeholder="Last name"
              />
            </div>
            <div className="relative">
              <InputElement
                name="address"
                type="text"
                className="pl-3 h-12 my-5 "
                placeholder="Address"
              />
              <Search className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600" />
            </div>
            <InputElement
              name="apartment"
              type="text"
              className="pl-3 h-12"
              placeholder="Apartment, suite, etc. (optional)"
            />
            <div className="flex flex-row space-x-3 mt-5 ">
              <InputElement
                name="postalCode"
                type="number"
                className="pl-3 h-12 "
                placeholder="Postal code"
              />
              <InputElement
                name="city"
                type="text"
                className="pl-3 h-12 "
                placeholder="City"
              />
            </div>
            <div className="flex flex-row items-center gap-2 py-4">
              <Checkbox className="bg-white" />
              <div className="text-lg">Save this information for next time</div>
            </div>

            <Button className="bg-sky-600 w-full py-8 my-8 text-xl">
              Complete order
            </Button>
            <div className="border-t border-gray-300 my-4"></div>
          </Form>
        </div>
        <div className="basis-1/4 bg-stone-100 overflow-auto hidden lg:block pl-5 sticky top-0">
          <div className="flex flex-col">
            {cartItems?.data.map((cartItem, index) => (
              <div key={index}>
                <div className="flex justify-between py-3 px-2 gap-2 items-center">
                  <Image
                    className="w-10 h-12 col-span-1 outline outline-offset-2 outline-1 rounded-lg outline-gray-400 "
                    src={
                      ((cartItem.item.images ?? []) as ImageSchemaType[])[0]
                        .url!
                    }
                    alt={
                      ((cartItem.item.images ?? []) as ImageSchemaType[])[0]
                        .alt!
                    }
                    width={50}
                    height={70}
                  />
                  <div className="text-sm col-span-3 text-left grow pl-5">
                    {cartItem.item.title}
                  </div>
                  <div className="text-sm col-span-1 flex justify-center text-right">
                    {cartItem.item.price.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div className="flex justify-between pr-3 mt-3">
            <div className="text-md ">Subtotal</div>
            <div className=" text-lg">{totalPrice.toFixed(2)}</div>
          </div>
          <div className="flex justify-between pr-3 mt-3">
            <div className="text-md ">Shipping</div>
            <div className=" text-lg">29.00</div>
          </div>
          <hr />
          <div className="flex justify-between mt-3 pr-3 font-bold">
            <div className="text-md ">Total</div>
            <div className=" text-lg">{(totalPrice + 29).toFixed(2)}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CheckoutView;
