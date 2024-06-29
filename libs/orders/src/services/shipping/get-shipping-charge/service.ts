import { ShippingChargesSchema, ShippingChargesSchemaType } from './zod';
import { PrismaClient } from '@prisma/client';

export async function calculateShippingCharges(
  _data: ShippingChargesSchemaType
) {
  const prisma = new PrismaClient();

  const { ...data } = ShippingChargesSchema.parse(_data);

  const { pinCode } = (await prisma.customerAddress.findUnique({
    where: {
      id: data.shippingAddressId,
    },
    select: {
      pinCode: true,
    },
  })) ?? { pinCode: null };

  let shippingCost;
  const deliveryAvailable = true; // Assume true for demonstration

  if (!pinCode) {
    throw new Error('Pincode is required');
  }

  if (data.paymentType === 'ONLINE') {
    if (isPinCodeInKerala(pinCode)) {
      shippingCost = 0.0;
    }
    shippingCost = 29.0; // Example cost
  } else if (data.paymentType === 'CASH_ON_DELIVERY') {
    shippingCost = 49.0; // Additional cost for COD
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7); // 7 days delivery

  return {
    shippingCost,
    estimatedDelivery,
    deliveryAvailable,
  };
}

const isPinCodeInKerala = (pinCode: string) => {
  const pinCodeNumber = parseInt(pinCode, 10);
  return pinCodeNumber >= 670001 && pinCodeNumber <= 695615;
};
