import { getCouponByCode } from '@vestido-ecommerce/coupons';
import { VestidoError } from '@vestido-ecommerce/utils';

import { calculateShippingCharges } from '../../shipping/get-shipping-charge';
import { CalculateTotalSchema, CalculateTotalSchemaType } from './zod';

export async function calculateTotal(data: CalculateTotalSchemaType) {
  const validatedData = CalculateTotalSchema.parse(data);

  const shipping = await calculateShippingCharges({
    paymentType: validatedData.paymentType,
    shippingAddressId: validatedData.addressId,
  });
  const shippingCharges = shipping.shippingCost ?? 0;

  //Qty*price to show in Storefront
  const itemsPrice =
    validatedData.orderItems?.reduce((total, item) => {
      return total + (item.qty ?? 1) * item.price;
    }, 0) ?? 0;

  // Calculate item prices and taxes
  const itemsWithTax = data.orderItems?.map((item) => {
    const itemTotal = (item.qty ?? 1) * item.price;
    let taxAmount = 0;

    if (item.taxInclusive && item.taxRate) {
      taxAmount = (item.taxRate * itemTotal) / 100;
    }

    return {
      ...item,
      taxAmount,
    };
  });

  const totalTax = itemsWithTax?.reduce((total, item) => {
    return total + item.taxAmount;
  }, 0);

  const subTotal = itemsPrice - totalTax;
  let discount = 0;

  //apply coupon on subTotal
  const coupon = await getCouponByCode(validatedData.couponCode);

  if (!coupon) {
    throw new VestidoError({
      name: 'ErrorCouponNotFound',
      message: `CouponCode ${validatedData.couponCode} not found`,
    });
  }

  if (coupon.discountType == 'AMOUNT') {
    discount = coupon.discountAmount;
  }
  if (coupon.discountType == 'PERCENTAGE') {
    discount = (subTotal * coupon.discountPercent) / 100;
  }

  const grandTotal = subTotal - discount + totalTax + shippingCharges;

  const calculatedData = {
    shippingCharges,
    itemsPrice,
    totalTax,
    subTotal,
    discount,
    grandTotal,
    itemsWithTax,
  };
  return calculatedData;
}
