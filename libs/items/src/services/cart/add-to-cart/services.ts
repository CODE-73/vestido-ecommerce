import { getPrismaClient } from '@vestido-ecommerce/models';
import { AddToCartSchema, AddToCartSchemaType } from './zod';

export async function addToCart(body: AddToCartSchemaType) {
  const prisma = getPrismaClient();

  const validatedData = AddToCartSchema.parse(body);

  // Determine if the item has a variant
  const hasVariant = validatedData.variantId !== undefined;

  let existingCartItem;

  if (hasVariant) {
    // If the item has a variant, check for the variantId in the cart
    existingCartItem = await prisma.cartItem.findFirst({
      where: {
        customerId: validatedData.customerId,
        itemId: validatedData.itemId,
        variantId: validatedData.variantId,
      },
    });
  } else {
    // If the item does not have a variant, check only for the itemId in the cart
    existingCartItem = await prisma.cartItem.findFirst({
      where: {
        customerId: validatedData.customerId,
        itemId: validatedData.itemId,
        variantId: null,
      },
    });
  }

  if (existingCartItem) {
    // If the item or its variant is already in the cart, increase its quantity by 1
    const updatedCartItem = await prisma.cartItem.update({
      where: {
        id: existingCartItem.id,
      },
      data: {
        qty: existingCartItem.qty + 1,
      },
    });

    return updatedCartItem;
  } else {
    // If the item or its variant is not in the cart, create a new cart item
    const cartItem = await prisma.cartItem.create({
      data: {
        qty: validatedData.qty,
        customer: {
          connect: {
            id: validatedData.customerId,
          },
        },
        item: {
          connect: {
            id: validatedData.itemId,
          },
        },
        ...(validatedData.variantId
          ? {
              variant: {
                connect: {
                  id: validatedData.variantId,
                },
              },
            }
          : {}),
      },
    });

    return cartItem;
  }
}
