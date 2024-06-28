import * as React from 'react';
import Image from 'next/image';
import { useCart } from '@vestido-ecommerce/items';
import { ImageSchemaType } from '@vestido-ecommerce/utils';
import { z } from 'zod';
import { Dialog, DialogTrigger } from '@vestido-ecommerce/shadcn-ui/dialog';
import AddAddressDialog from './AddAddressDialog';
import { CustomerAddressElement } from './CustomerAddressElement';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const OrderItemSchema = z.object({
  itemId: z.string().uuid(),
  price: z.coerce.number(),
  qty: z.number().int(),
});

const CreateOrderFormSchema = z.object({
  // dateTime: z.string().datetime(),
  totalPrice: z.coerce.number(),
  itemsCount: z.number().int(),
  addressId: z.string().uuid(),
  customerId: z.string().uuid(),
  orderItems: z.array(OrderItemSchema),
});

export type CreateOrderForm = z.infer<typeof CreateOrderFormSchema>;
const CheckoutView: React.FC = () => {
  const { data: cartItems } = useCart();

  const form = useForm<CreateOrderForm>({
    resolver: zodResolver(CreateOrderFormSchema),
    defaultValues: {},
  });

  const totalPrice =
    cartItems?.data.reduce((total, item) => {
      return total + item.qty * item.item.price;
    }, 0) ?? 0;

  const handleSubmit = () => {
    console.log('hello');
  };

  return (
    <>
      <div className="text-lg tracking-wide text-gray-300 text-center font-semibold my-12 uppercase">
        <span className="text-black">
          <Link href="/cart">Cart ----- </Link>
        </span>
        <span className="text-[#48CAB2] text-2xl underline decoration-4 underline-offset-3">
          Address
        </span>
        ----- Payment
      </div>
      <div className="text-lg font-semibold pb-3">Choose Delivery Address </div>

      <div className=" flex flex-col lg:flex-row items-start gap-2 divide-x">
        <div className="basis-3/5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              {/* {addresses?.data.map((address, index) => (
            <div
              key={index}
              className="h-40 border   w-full p-5 mb-5 shadow border-3 border-gray-300
              "
            >
              <div className="font-semibold flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>
                    {address.firstName} {address.lastName}
                  </div>
                  <div className="text-[#48CAB2] rounded-xl border border-1 border-[#48CAB2] text-[10px] px-2 flex items-center">
                    {address.addressType}
                  </div>
                </div>
                <div
                  className={`${
                    address.default
                      ? 'bg-[#48CAB2] px-3 py-2 rounded-lg text-white'
                      : 'hidden'
                  }`}
                >
                  DEFAULT
                </div>
              </div>
              <div className="text-sm w-1/2 text-wrap pt-4 text-gray-600">
                {address.line1}, {address.line2}, {address.district},
                {address.state}, {address.pinCode}
              </div>
              <div className="pt-4 flex gap-2 font-semibold items-center">
                <div className="text-sm text-gray-600">Mobile:</div>
                <div> {address.mobile}</div>
              </div>
            </div>
          ))} */}
              <CustomerAddressElement name="addressId" required />
            </form>
          </Form>
          <Dialog>
            <DialogTrigger asChild>
              <div className="border font-semibold w-full p-5 mb-10 cursor-pointer  border-dashed text-[#48CAB2] border-3 border-gray-300">
                + Add New Address
              </div>
            </DialogTrigger>
            <AddAddressDialog />
          </Dialog>
        </div>
        <div className="basis-2/5 overflow-auto hidden lg:block pl-5 sticky top-0">
          <div className="flex flex-col">
            {cartItems?.data.map((cartItem, index) => (
              <div key={index}>
                <div className="flex justify-between py-3 px-2 gap-2 items-center">
                  <Image
                    className="w-10 h-12 col-span-1 "
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
