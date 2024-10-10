import { getPrismaClient } from '@vestido-ecommerce/models';

import { calculateTotal } from '../calculate-total';
import { CreateOrderSchema, CreateOrderSchemaType } from './zod';

export async function createOrder(_data: CreateOrderSchemaType) {
  const prisma = getPrismaClient();

  // validate zod here
  const { addressId, customerId, paymentType, ...data } =
    CreateOrderSchema.parse(_data);
  // pass to prisma next

  const calculateData = {
    addressId: addressId,
    orderItems: _data.orderItems,
    paymentType,
  };

  const { shippingCharges, itemsPrice } = await calculateTotal(calculateData);

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

  const newOrder = await prisma.order.create({
    data: {
      ...data,
      dateTime: new Date(),
      orderStatus: 'PENDING',
      totalPrice: itemsPrice - totalTax,
      totalTax: totalTax,
      totalCharges: shippingCharges,
      grandTotal: itemsPrice + shippingCharges,
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
          data: itemsWithTax.map((item) => ({
            itemId: item.itemId,
            price: item.price,
            qty: item.qty,
            variantId: item.variantId,
            taxTitle: item.taxTitle,
            taxRate: item.taxRate,
            taxInclusive: item.taxInclusive,
            taxAmount: item.taxAmount, // Added taxAmount here
          })),
        },
      },
    },
  });

  let newPayment = null;
  if (paymentType == 'CASH_ON_DELIVERY') {
    newPayment = await prisma.payment.create({
      data: {
        order: {
          connect: {
            id: newOrder.id,
          },
        },
        paymentGateway: 'CASH_ON_DELIVERY',
        paymentGatewayRef: 'Null',
        moreDetails: 'Null',
        currency: 'INR',
        amount: itemsPrice + shippingCharges,
        status: 'PENDING',
      },
    });

    // Clear Cart on Confirmation
    await prisma.cartItem.deleteMany({
      where: {
        customerId: customerId,
        itemId: {
          in: data.orderItems.map((item) => item.itemId),
        },
      },
    });
  }

  return {
    order: newOrder,
    payment: newPayment,
  };
  /**
   * return {
   *  order: newOrder,
   *  paymentGateway: "",
   *  paymentGatewayArgs: {
   *     ...
   *  }
   * }
   */
}
