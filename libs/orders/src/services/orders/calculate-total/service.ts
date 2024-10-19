import { calculateShippingCharges } from '../../shipping/get-shipping-charge';
import { CalculateTotalSchema, CalculateTotalSchemaType } from './zod';

export async function calculateTotal(data: CalculateTotalSchemaType) {
  const validatedData = CalculateTotalSchema.parse(data);

  const shipping = await calculateShippingCharges({
    paymentType: validatedData.paymentType,
    shippingAddressId: validatedData.addressId,
  });
  const shippingCharges = shipping.shippingCost ?? 0;

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

  const calculatedData = {
    shippingCharges,
    itemsPrice,
    totalTax,
    itemsWithTax,
  };
  return calculatedData;
}
