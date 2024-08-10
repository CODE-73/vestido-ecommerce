import {
  Item,
  ItemAttribute,
  ItemVariant,
  Order,
  OrderItem,
  VariantAttributeValue,
} from '@prisma/client';

export type ListOrderResponse = {
  data: Array<
    Order & {
      orderItems: Array<
        OrderItem & {
          item: Item & {
            variants: Array<
              ItemVariant & {
                attributeValues: Array<
                  VariantAttributeValue & { attribute: ItemAttribute }
                >;
              }
            >;
          };
        }
      >;
    }
  >;
};
