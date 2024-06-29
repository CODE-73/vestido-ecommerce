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
import { useState } from 'react';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { RadioGroupElement } from '../../forms/radio-group-element';
import { useShippingCharges } from '@vestido-ecommerce/orders';
import { ChevronRight } from 'lucide-react';

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
  paymentType: z.enum(['ONLINE', 'CASH_ON_DELIVERY']),
});

export type CreateOrderForm = z.infer<typeof CreateOrderFormSchema>;
const CheckoutView: React.FC = () => {
  const { data: cartItems } = useCart();
  const [currentSession, setCurrentSession] = useState('Address');

  const form = useForm<CreateOrderForm>({
    resolver: zodResolver(CreateOrderFormSchema),
    defaultValues: {},
  });

  const [shippingAddressId, paymentType] = form.watch([
    'addressId',
    'paymentType',
  ]);

  console.log('address is', shippingAddressId);
  const { data: shipping } = useShippingCharges({
    shippingAddressId,
    paymentType,
  });

  console.log('shipping', shipping);
  console.info('formvalues', form.getValues());

  const totalPrice =
    cartItems?.data.reduce((total, item) => {
      return total + item.qty * item.item.price;
    }, 0) ?? 0;

  const handleSubmit = () => {
    console.log('hello');
  };

  return (
    <>
      {currentSession == 'Address' && (
        <div className="text-lg tracking-wide text-gray-300 text-center font-semibold md:mt-12 md:mb-12 mt-32 mb-16 uppercase">
          <span className="text-black">
            <Link href="/cart">Cart ----- </Link>
          </span>
          <span className="text-[#48CAB2] text-2xl underline decoration-4 underline-offset-3">
            Address
          </span>
          ----- Payment
        </div>
      )}
      {currentSession == 'Payment' && (
        <div className="text-lg tracking-wide text-gray-300 text-center font-semibold md:mt-12 md:mb-12 mt-32 mb-16 uppercase">
          <span className="text-black">
            <Link href="/cart">Cart ----- </Link>
          </span>
          <span
            onClick={() => setCurrentSession('Address')}
            className="text-black cursor-pointer"
          >
            Address -----
          </span>
          <span className="text-[#48CAB2] text-2xl underline decoration-4 underline-offset-3">
            Payment
          </span>
        </div>
      )}
      <div className="text-lg font-semibold pb-3">Choose Delivery Address </div>

      <div className=" flex flex-col lg:flex-row items-start gap-2 divide-x">
        <div className="basis-3/5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              {currentSession == 'Address' ? (
                <CustomerAddressElement name="addressId" required />
              ) : (
                <RadioGroupElement
                  name="paymentType"
                  label="Payment Type"
                  options={[
                    { label: 'Pay Now', value: 'ONLINE' },
                    {
                      label: 'Cash on Delivery',
                      value: 'CASH_ON_DELIVERY',
                    },
                  ]}
                />
              )}
            </form>
          </Form>
          {currentSession == 'Address' && (
            <Dialog>
              <DialogTrigger asChild>
                <div className="border font-semibold w-full p-5 mb-10 cursor-pointer  border-dashed text-[#48CAB2] border-3 border-gray-300">
                  + Add New Address
                </div>
              </DialogTrigger>
              <AddAddressDialog />
            </Dialog>
          )}
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
            <div className=" text-lg">
              {shipping?.data?.shippingCost.toFixed(2)}
            </div>
          </div>
          <hr />
          <div className="flex justify-between mt-3 pr-3 font-bold">
            <div className="text-md ">Total</div>
            <div className=" text-lg">{(totalPrice + 29).toFixed(2)}</div>
          </div>

          <Button
            type={currentSession == 'Address' ? 'button' : 'submit'}
            onClick={() => setCurrentSession('Payment')}
            className="disabled:bg-gray-300 uppercase flex tracking-wide bg-[#48CAB2] w-full h-14 hover:bg-gray-400 text-md font-extrabold hover:text-black text-white justify-center mt-5"
          >
            {currentSession == 'Address' && (
              <div className="flex">
                CHOOSE PAYMENT METHOD <ChevronRight />
              </div>
            )}
            {currentSession == 'Payment' && <div>proceed to payment</div>}
          </Button>
        </div>
      </div>
    </>
  );
};
export default CheckoutView;
