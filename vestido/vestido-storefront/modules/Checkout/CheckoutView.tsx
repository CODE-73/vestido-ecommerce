import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryState } from 'nuqs';
import { useForm } from 'react-hook-form';
import { LuChevronRight } from 'react-icons/lu';
import { z } from 'zod';

import { useCart, useItem } from '@vestido-ecommerce/items/client';
import {
  useCalculateTotal,
  useCreateOrder,
} from '@vestido-ecommerce/orders/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Dialog, DialogTrigger } from '@vestido-ecommerce/shadcn-ui/dialog';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';
import { formatINR } from '@vestido-ecommerce/utils';

import ItemImage from '../../components/item-image';
import AddAddressDialog from './AddAddressDialog';
import { CustomerAddressElement } from './CustomerAddressElement';
import { PaymentTypeElement } from './PaymentTypeElement';

const OrderItemSchema = z
  .object({
    itemId: z.string().uuid(),
    price: z.coerce.number(),
    qty: z.number().int(),
    variantId: z.string().uuid().nullish(),
    taxTitle: z.string().nullish(),
    taxRate: z.coerce.number().nullish(),
    taxInclusive: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.taxInclusive) {
        return data.taxTitle && data.taxRate;
      }
      return true;
    },
    {
      message: 'Tax title and tax rate are required when tax is inclusive',
      path: ['taxInclusive'],
    },
  );

const CreateOrderFormSchema = z.object({
  addressId: z.string().uuid(),
  orderItems: z.array(OrderItemSchema),
  paymentType: z.enum(['ONLINE', 'CASH_ON_DELIVERY']),
  couponCode: z.string().nullish(),
});

// types.tsx

export type CreateOrderForm = z.infer<typeof CreateOrderFormSchema>;
const CheckoutView: React.FC = () => {
  const router = useRouter();
  const { data: { data: cartItems } = { data: null } } = useCart();

  const [currentSession, setCurrentSession] = useState('Address');
  const [buyNowItemId] = useQueryState('buyNowItemId');
  const [buyNowVariantId] = useQueryState('buyNowVariantId');

  const { data: { data: buyNowItem } = { data: null } } = useItem(buyNowItemId);

  const checkoutItems = useMemo(
    () =>
      buyNowItem
        ? [
            {
              item: buyNowItem,
              itemId: buyNowItem.id,
              qty: 1,
              variantId: buyNowVariantId,
            },
          ]
        : cartItems,
    [cartItems, buyNowItem, buyNowVariantId],
  );

  const form = useForm<CreateOrderForm>({
    resolver: zodResolver(CreateOrderFormSchema),
    defaultValues: {
      paymentType: 'ONLINE',
    },
  });

  useEffect(() => {
    if (checkoutItems?.length) {
      form.setValue(
        'orderItems',
        checkoutItems?.map((checkoutItem) => ({
          itemId: checkoutItem.itemId,
          price: checkoutItem.item.discountedPrice || checkoutItem.item.price,
          qty: checkoutItem.qty,
          variantId: checkoutItem.variantId,
          taxTitle: checkoutItem.item.taxTitle || null, // Add taxTitle
          taxRate: checkoutItem.item.taxRate || null, // Add taxRate
          taxInclusive: checkoutItem.item.taxInclusive ?? false, // Add taxInclusive
        })),
      );
    } else {
      router.replace('/cart');
    }
  }, [checkoutItems, form, router]);

  const couponInputRef = useRef<HTMLInputElement | null>(null);

  const handleApplyCoupon = () => {
    const couponCode = couponInputRef.current?.value || '';
    form.setValue('couponCode', couponCode);
  };

  const [shippingAddressId, paymentType] = form.watch([
    'addressId',
    'paymentType',
  ]);

  const { trigger: createOrderTrigger } = useCreateOrder();

  const mappedOrderItems = checkoutItems
    ? checkoutItems.map((checkoutItem) => ({
        itemId: checkoutItem.itemId,
        price: checkoutItem.item.price, // Get price from the item object
        discountedPrice:
          checkoutItem.item.discountedPrice || checkoutItem.item.price,
        qty: checkoutItem.qty,
        variantId: checkoutItem.variantId || null, // Handle optional variantId
        taxTitle: checkoutItem.item.taxTitle || null, // Get taxTitle from the item object
        taxRate: checkoutItem.item.taxRate || null, // Get taxRate from the item object
        taxInclusive: checkoutItem.item.taxInclusive ?? false, // Get taxInclusive from the item object, default to false if null
      }))
    : [];

  const { data: { data: totals } = { data: null } } = useCalculateTotal({
    addressId: shippingAddressId,
    orderItems: mappedOrderItems,
    paymentType: paymentType,
    couponCode: form.watch('couponCode'),
  });

  const isSubmitting = form.formState.isSubmitting;
  const submitSuccesful = form.formState.isSubmitSuccessful;

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

      if (paymentType == 'CASH_ON_DELIVERY') {
        // Redirect to payment processing page
        router.replace(`/order-confirmed?orderId=${orderId}`);
      }

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
        <div className="text-xs md:text-lg tracking-wide text-gray-300 text-center font-semibold mt-top-margin-nav md:mt-12 md:mb-12 mb-16  uppercase font flex items-center justify-center gap-2">
          <Link href="/cart">
            Vca<span className="text-red-600">R</span>t
          </Link>
          <LuChevronRight />
          <span className="underline text-lg underline-offset-4">Address</span>
          <LuChevronRight /> Payment
        </div>
      )}
      {currentSession == 'Payment' && (
        <div className="text-xs md:text-lg tracking-wide text-gray-300 text-center font-semibold mb-16 mt-top-margin-nav md:mt-12 md:mb-12  uppercase flex items-center justify-center gap-2">
          <Link href="/cart">
            Vca<span className="text-red-600">R</span>t
          </Link>
          <LuChevronRight />

          <span
            onClick={() => setCurrentSession('Address')}
            className=" cursor-pointer"
          >
            Address
          </span>
          <LuChevronRight />
          <span className="underline text-lg underline-offset-4">Payment</span>
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
                    <div className="border font-semibold w-full p-5 mb-10 cursor-pointer  border-dashed text-gray-200 border-3 border-gray-300">
                      + Add New Address
                    </div>
                  </DialogTrigger>
                  <AddAddressDialog isNew={true} addressId={null} />
                </Dialog>
              )}
            </div>
            <div className="md:basis-2/5 overflow-auto  px-3 md:pl-5 md:sticky top-0 w-full text-white">
              <Table>
                <TableHeader>
                  <TableRow className="border-none hover:bg-transparent">
                    <TableHead>Image</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {checkoutItems?.map((checkoutItem, index) => (
                    <TableRow
                      key={index}
                      className="border-none hover:bg-transparent"
                    >
                      <TableCell>
                        <ItemImage
                          item={checkoutItem.item}
                          width={50}
                          height={70}
                          className="w-10 h-12 col-span-1"
                        />
                      </TableCell>
                      <TableCell>{checkoutItem.item.title}</TableCell>
                      <TableCell className="text-center">
                        {checkoutItem.qty}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <hr className="border-gray-600" />
              <div className="grid grid-cols-4 gap-2 my-3">
                <Input
                  name="couponCode"
                  ref={couponInputRef}
                  placeholder="Enter Coupon Code"
                  className="bg-gray-700 col-span-3 focus-visible:ring-0 border-none focus-visible:ring-offset-0 ring-offset-black"
                />
                <Button
                  onClick={handleApplyCoupon}
                  type="button"
                  className="uppercase bg-gray-700"
                >
                  APPLY
                </Button>
                {totals?.invalidCoupon ? (
                  <div className="col-span-4 text-center text-red-500 w-full">
                    Invalid Coupon
                  </div>
                ) : null}
              </div>
              <hr className="border-gray-600" />
              <div className="flex justify-between pr-3 mt-3">
                <div className="text-md">VcaRt Total</div>
                {totals ? (
                  <div className="text-lg">
                    {formatINR(totals.itemsOriginalPrice)}
                  </div>
                ) : (
                  <div className="text-lg">
                    <div className="animate-pulse bg-gray-800 h-3 w-20 rounded"></div>
                  </div>
                )}
              </div>
              <div className="flex justify-between pr-3 mt-3">
                <div className="text-md">Discount</div>
                {totals ? (
                  <div className="text-lg">
                    {formatINR(totals.itemsOriginalPrice - totals.itemsPrice)}
                  </div>
                ) : (
                  <div className="text-lg">
                    <div className="animate-pulse bg-gray-800 h-3 w-20 rounded"></div>
                  </div>
                )}
              </div>
              <div className="flex justify-between pr-3 mt-3">
                <div className="text-md">Subtotal</div>
                {totals ? (
                  <div className="text-lg">{formatINR(totals.itemsPrice)}</div>
                ) : (
                  <div className="text-lg">
                    <div className="animate-pulse bg-gray-800 h-3 w-20 rounded"></div>
                  </div>
                )}
              </div>
              <div className="flex justify-between pr-3 mt-3">
                <div className="text-md">Coupon Discount</div>
                {totals ? (
                  <div className="text-lg">
                    {formatINR(totals.couponDiscount)}
                  </div>
                ) : (
                  <div className="text-lg">
                    <div className="animate-pulse bg-gray-800 h-3 w-20 rounded"></div>
                  </div>
                )}
              </div>
              <div className="flex justify-between pr-3 mt-3">
                <div className="text-md">Shipping</div>
                {totals ? (
                  <div className="text-lg">
                    {formatINR(totals.shippingCharges)}
                  </div>
                ) : (
                  <div className="text-lg">
                    <div className="animate-pulse bg-gray-800 h-3 w-20 rounded"></div>
                  </div>
                )}
              </div>
              <hr className="border-gray-600" />
              <div className="flex justify-between mt-3 pr-3 font-bold">
                <div className="text-md ">Grand Total</div>
                {totals ? (
                  <div className="text-lg">{formatINR(totals.grandTotal)}</div>
                ) : (
                  <div className="text-lg">
                    <div className="animate-pulse bg-gray-800 h-3 w-20 rounded"></div>
                  </div>
                )}
              </div>

              {currentSession == 'Address' && (
                <Button
                  disabled={!shippingAddressId}
                  type="button"
                  onClick={() => setCurrentSession('Payment')}
                  className="disabled:bg-gray-300 uppercase flex tracking-wide bg-white  text-black hover:bg-neutral-900 hover:border hover:border-white hover:text-white w-full h-14 text-md font-extrabold   justify-center mt-5"
                >
                  <div className="flex items-center gap-2">
                    CHOOSE PAYMENT METHOD
                    <LuChevronRight strokeWidth={2} size={24} />
                  </div>
                </Button>
              )}
              {currentSession == 'Payment' && (
                <Button
                  type="submit"
                  disabled={isSubmitting || submitSuccesful}
                  className="disabled:bg-gray-300 uppercase flex tracking-wide bg-white text-black hover:bg-sky-100 hover:border hover:border-white  w-full h-14  text-md font-extrabold justify-center mt-5"
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
