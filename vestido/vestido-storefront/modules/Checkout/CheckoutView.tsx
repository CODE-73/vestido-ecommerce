import * as React from 'react';
import Image from 'next/image';
import { Checkbox } from '@vestido-ecommerce/shadcn-ui/checkbox';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@vestido-ecommerce/shadcn-ui/select';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Search } from 'lucide-react';
import { Label } from '@vestido-ecommerce/shadcn-ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@vestido-ecommerce/shadcn-ui/radio-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import product11 from '../../assets/offer-products/product1-1.jpg';
import product12 from '../../assets/offer-products/product1-2.jpg';
import product21 from '../../assets/offer-products/product2-1.jpg';
import product22 from '../../assets/offer-products/product2-2.jpg';
import product31 from '../../assets/offer-products/product3-1.jpg';
import product32 from '../../assets/offer-products/product3-2.jpg';
import product41 from '../../assets/offer-products/product4-1.jpg';
import product42 from '../../assets/offer-products/product4-2.jpg';
import product51 from '../../assets/offer-products/product5-1.jpg';
import product52 from '../../assets/offer-products/product5-2.jpg';
import product61 from '../../assets/offer-products/product6-1.jpg';
import product62 from '../../assets/offer-products/product6-2.jpg';
import { InputElement } from '@vestido-ecommerce/shadcn-ui/form/InputElement';
const data = [
  {
    cardImage1: product11,
    cardImage2: product12,
    name: 'T-shirt with pearly sleeves',
    salePercent: '13',
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product21,
    cardImage2: product22,
    name: 'Metallic Effect Bag',
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product31,
    cardImage2: product32,
    name: 'Knit Beanie with slogan',
    textColor: 'white',
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product41,
    cardImage2: product42,
    name: 'T-shirt with pearly sleeves',
    salePercent: '13',
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product51,
    cardImage2: product52,
    name: 'Metallic Effect Bag',
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product61,
    cardImage2: product62,
    name: 'Knit Beanie with slogan',
    textColor: 'white',
    price: '$450.00',
    offerPrice: '$390.00',
  },
];
const formSchema = z.object({
  email: z.string().email(),
});
const CheckoutView: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('default');
  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
  return (
    <div className=" w-screen grid lg:grid-cols-2 grid-cols-1 items-start">
      <div className="p-10 border-2 border-r-gray-300 pl-44">
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
          <div className="flex flex-row items-center gap-2 ">
            <Checkbox className="bg-white" />
            <div className="text-lg">Email me with news and offers</div>
          </div>
          <div className="text-2xl mt-7">Delivery</div>
          <Select>
            <SelectTrigger className="h-12 my-5" id="framework">
              <SelectValue placeholder="Country/Region" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="india">India</SelectItem>
              <SelectItem value="america">America</SelectItem>
              <SelectItem value="china">China</SelectItem>
              <SelectItem value="us">US</SelectItem>
            </SelectContent>
          </Select>
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
          <div className="text-xl mt-5">Shipping method</div>
          <div className="flex items-center pl-3 bg-stone-100 h-16 text-gray-500 my-4 rounded-md">
            Enter your shipping address to view available shipping methods.
          </div>
          <div className="text-2xl mt-10">Payment</div>
          <div className="text-gray-500 my-3">
            All transactions are secure and encrypted.
          </div>
          <div className="flex items-center pl-3 bg-sky-50 h-16 outline outline-sky-600  rounded-md">
            Cash on Delivery (COD)
          </div>
          <div className="text-xl mt-5">Billing address</div>
          <RadioGroup
            name="radioItem"
            value={selectedOption}
            onValueChange={handleOptionChange}
          >
            <div className="rounded-t-lg flex items-center pl-3 space-x-2 h-12 outline outline-stone-300 ">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Same as shipping address</Label>
            </div>
            <div className="flex items-center space-x-2 pl-3 h-12 -mt-2  outline outline-stone-300">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Use a different billing address</Label>
            </div>
          </RadioGroup>
          {selectedOption === 'comfortable' && (
            <form className="rounded-b-lg outline outline-stone-300 bg-stone-100 p-5  transition-all duration-1000 ease-in-out transform translate-y-0">
              <Select>
                <SelectTrigger className="h-12 my-5" id="framework">
                  <SelectValue placeholder="Country/Region" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="america">America</SelectItem>
                  <SelectItem value="china">China</SelectItem>
                  <SelectItem value="us">US</SelectItem>
                </SelectContent>
              </Select>
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
              <div className="flex flex-row space-x-3 h-12 my-5 ">
                <InputElement
                  name="firstName"
                  type="text"
                  className="pl-3 h-12"
                  placeholder="City"
                />
                <InputElement
                  name="lastName"
                  type="text"
                  className="pl-3 h-12"
                  placeholder="State"
                />
                <InputElement
                  name="lastName"
                  type="text"
                  className="pl-3 h-12"
                  placeholder="PIN code"
                />
              </div>
            </form>
          )}
          <Button className="bg-sky-600 w-full py-8 my-8 text-xl">
            Complete order
          </Button>
          <div className="border-t border-gray-300 my-4"></div>
        </Form>
      </div>
      <div className="bg-stone-100 overflow-auto hidden lg:block pl-5 pr-60 sticky top-0">
        <div className="flex flex-col ">
          {data.map((item, index) => (
            <div key={index}>
              <div className="grid gap-2 grid-cols-5 auto-rows-auto items-center py-3">
                <Image
                  className="w-10 h-12 col-span-1 ml-10 outline outline-offset-2 outline-1 rounded-lg outline-gray-400 "
                  src={item.cardImage1}
                  alt="alt text"
                />
                <div className="text-base col-span-3 lg:pl-10 ">
                  {item.name}
                </div>
                <div className="text-lg col-span-1 flex justify-center lg:pl-10  ">
                  {item.offerPrice}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row mt-7">
          <div className="text-lg px-9 ">Subtotal</div>
          <div className="ml-auto text-xl">$2,220.00</div>
        </div>
        <div className="flex flex-row  mt-3">
          <div className="text-lg px-9">Shipping</div>
          <div className="ml-auto text-gray-500">Enter shipping address</div>
        </div>
        <div className="flex flex-row mt-3">
          <div className="text-xl px-9 ">Total</div>
          <div className="flex flex-row ml-auto space-x-2">
            <div className="text-gray-500 flex items-end ">USD</div>
            <div className="text-2xl">$2,220.00</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutView;
