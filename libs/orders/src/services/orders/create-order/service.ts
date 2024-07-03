import { getPrismaClient } from '@vestido-ecommerce/models';
import { CreateOrderSchema, CreateOrderSchemaType } from './zod';
import { calculateShippingCharges } from '../../shipping/get-shipping-charge';

export async function createOrder(_data: CreateOrderSchemaType) {
  const prisma = getPrismaClient();

  // validate zod here
  const { addressId, customerId, paymentType, ...data } =
    CreateOrderSchema.parse(_data);
  // pass to prisma next

  const shipping = await calculateShippingCharges({
    paymentType: paymentType,
    shippingAddressId: addressId,
  });

  const shippingCharges = shipping.shippingCost ?? 0;

  const itemsPrice =
    data.orderItems?.reduce((total, item) => {
      return total + item.qty * item.price;
    }, 0) ?? 0;

  const newOrder = await prisma.order.create({
    data: {
      ...data,
      dateTime: new Date(),
      status: 'PENDING',
      totalPrice: itemsPrice + shippingCharges,
      customer: {
        connect: {
          id: customerId,
        },
      },
      shippingAddress: {
        connect: {
          id: addressId,
        },
      },
      orderItems: {
        createMany: {
          data: data.orderItems,
        },
      },
    },
  });

  return newOrder;
}
