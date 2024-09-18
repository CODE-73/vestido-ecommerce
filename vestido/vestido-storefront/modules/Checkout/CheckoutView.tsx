import * as React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuChevronRight } from 'react-icons/lu';
import { z } from 'zod';

import { useCart } from '@vestido-ecommerce/items/client';
import {
  useCreateOrder,
  useShippingCharges,
} from '@vestido-ecommerce/orders/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Dialog, DialogTrigger } from '@vestido-ecommerce/shadcn-ui/dialog';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import AddAddressDialog from './AddAddressDialog';
import { CustomerAddressElement } from './CustomerAddressElement';
import { PaymentTypeElement } from './PaymentTypeElement';

const OrderItemSchema = z.object({
  itemId: z.string().uuid(),
  price: z.coerce.number(),
  qty: z.number().int(),
  variantId: z.string().uuid().nullish(),
});

const CreateOrderFormSchema = z.object({
  addressId: z.string().uuid(),
  orderItems: z.array(OrderItemSchema),
  paymentType: z.enum(['ONLINE', 'CASH_ON_DELIVERY']),
});

// types.tsx

export type CreateOrderForm = z.infer<typeof CreateOrderFormSchema>;
const CheckoutView: React.FC = () => {
  const router = useRouter();
  const { data: cartItems } = useCart();
  // const { data: addresses } = useAddresses();

  const [currentSession, setCurrentSession] = useState('Address');

  const form = useForm<CreateOrderForm>({
    resolver: zodResolver(CreateOrderFormSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (cartItems?.data?.length) {
      form.setValue(
        'orderItems',
        cartItems?.data.map((cartItem) => ({
          itemId: cartItem.itemId,
          price: cartItem.item.price,
          qty: cartItem.qty,
          variantId: cartItem.variantId ?? null,
        })),
      );
    }
  }, [cartItems?.data, form]);

  const [shippingAddressId, paymentType] = form.watch([
    'addressId',
    'paymentType',
  ]);

  const { data: shipping } = useShippingCharges({
    shippingAddressId,
    paymentType,
  });

  const shippingCharges = shipping?.data?.shippingCost ?? 0;

  const { trigger: createOrderTrigger } = useCreateOrder();

  const totalPrice =
    cartItems?.data.reduce((total, item) => {
      return total + item.qty * item.item.price;
    }, 0) ?? 0;

  const handleSubmit = async (data: CreateOrderForm) => {
    try {
      const createOrderResponse = await createOrderTrigger({
        ...data,
      });

      if (!createOrderResponse.success) {
        throw createOrderResponse.error;
      }

      console.log('Create Order Response: ', createOrderResponse);
      const { order, payment } = createOrderResponse.data;

      const orderId = order.id;
      const paymentId = payment?.id ?? null;
      console.log('orderId & PaymentId : ', orderId, paymentId);

      // const toPay = totalPrice + shippingCharges;
      // const amountInPaise = Math.round(toPay * 100);

      if (paymentType == 'ONLINE') {
        // Redirect to payment processing page
        router.replace(`/processing-payment?orderId=${orderId}`);
      }
    } catch (e) {
      console.error('Error', e);
    }
  };

  return (
    <>
      {currentSession == 'Address' && (
        <div className="text-xs md:text-lg tracking-wide text-gray-300 text-center font-semibold md:mt-12 md:mb-12 mt-32 mb-16 uppercase font flex items-center justify-center gap-2">
          <Link href="/cart">Cart</Link>
          <LuChevronRight />{' '}
          <span className="text-[#48CAB2] text-2xl">Address</span>
          <LuChevronRight /> Payment
        </div>
      )}
      {currentSession == 'Payment' && (
        <div className="text-xs md:text-lg tracking-wide text-gray-300 text-center font-semibold md:mt-12 md:mb-12 mt-32 mb-16 uppercase flex items-center justify-center gap-2">
          <Link href="/cart">Cart </Link>
          <LuChevronRight />

          <span
            onClick={() => setCurrentSession('Address')}
            className=" cursor-pointer"
          >
            Address
          </span>
          <LuChevronRight />
          <span className="text-[#48CAB2] text-2xl ">Payment</span>
        </div>
      )}

      <div className="text-lg font-semibold pb-3 pl-3 md:pl-0 text-white">
        {currentSession == 'Payment' ? (
          <>Choose a Payment Method</>
        ) : (
          <>Choose Delivery Address</>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className=" flex flex-col items-center md:flex-row md:items-start items-start gap-2 md:divide-x divide-gray-500">
            <div className="w-full md:w-auto px-3 md:px-0 md:basis-3/5">
              {currentSession == 'Address' ? (
                <CustomerAddressElement name="addressId" />
              ) : (
                <PaymentTypeElement name="paymentType" />
              )}

              {currentSession == 'Address' && (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="border font-semibold w-full p-5 mb-10 cursor-pointer  border-dashed text-[#48CAB2] border-3 border-gray-300">
                      + Add New Address
                    </div>
                  </DialogTrigger>
                  <AddAddressDialog isNew={true} addressId={null} />
                </Dialog>
              )}
            </div>
            <div className="md:basis-2/5 overflow-auto  px-3 md:pl-5 md:sticky top-0 w-full text-white">
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
                        ₹&nbsp;{cartItem.item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="border-gray-600" />
              <div className="flex justify-between pr-3 mt-3">
                <div className="text-md ">Subtotal</div>
                <div className=" text-lg">₹&nbsp;{totalPrice.toFixed(2)}</div>
              </div>
              <div className="flex justify-between pr-3 mt-3">
                <div className="text-md ">Shipping</div>
                <div className=" text-lg">
                  ₹&nbsp;{(shippingCharges as number).toFixed(2)}
                </div>
              </div>
              <hr className="border-gray-600" />
              <div className="flex justify-between mt-3 pr-3 font-bold">
                <div className="text-md ">Total</div>
                <div className=" text-lg">
                  ₹&nbsp;{(totalPrice + (shippingCharges as number)).toFixed(2)}
                </div>
              </div>

              {currentSession == 'Address' && (
                <Button
                  disabled={!shippingAddressId}
                  type="button"
                  onClick={() => setCurrentSession('Payment')}
                  className="disabled:bg-gray-300 uppercase flex tracking-wide bg-[#48CAB2] w-full h-14 hover:bg-gray-400 text-md font-extrabold hover:text-black text-white justify-center mt-5"
                >
                  <div className="flex">
                    CHOOSE PAYMENT METHOD <LuChevronRight />
                  </div>
                </Button>
              )}
              {currentSession == 'Payment' && (
                <Button
                  type="submit"
                  className="disabled:bg-gray-300 uppercase flex tracking-wide bg-[#48CAB2] w-full h-14 hover:bg-gray-400 text-md font-extrabold hover:text-black text-white justify-center mt-5"
                >
                  <div>PROCEED TO PAYMENT</div>
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
export default CheckoutView;
