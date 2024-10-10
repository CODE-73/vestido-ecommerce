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

  return { shippingCharges, itemsPrice };
}
