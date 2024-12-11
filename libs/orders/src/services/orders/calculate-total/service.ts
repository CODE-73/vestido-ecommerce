import { getCouponByCode } from '@vestido-ecommerce/coupons';

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
    let taxAmount = 0;

    if (item.taxInclusive && item.taxRate) {
      const itemsPriceWithoutTax = (item.price * 100) / (100 + item.taxRate);
      taxAmount = item.price - itemsPriceWithoutTax; // tax per item irrespective of qty
    }

    return {
      ...item,
      taxAmount,
    };
  });

  const totalTax = itemsWithTax?.reduce((total, item) => {
    return total + item.taxAmount * (item.qty ?? 1);
  }, 0);

  const subTotal = itemsPrice - totalTax;

  let discount = 0;
  let coupon;
  let invalidCoupon = false;

  //apply coupon on subTotal
  if (validatedData.couponCode) {
    coupon = await getCouponByCode(validatedData.couponCode);

    if (!coupon) {
      invalidCoupon = true;
    } else {
      if (coupon.discountType == 'AMOUNT') {
        discount = coupon.discountAmount;
      }
      if (coupon.discountType == 'PERCENTAGE') {
        discount = (subTotal * coupon.discountPercent) / 100;
      }
    }
  }

  //  const totalCharges = shippingCharges;
  const grandTotal = subTotal - discount + totalTax + shippingCharges;

  const calculatedData = {
    shippingCharges,
    itemsPrice,
    totalTax,
    discount,
    grandTotal,
    itemsWithTax,
    invalidCoupon,
  };
  return calculatedData;
}
