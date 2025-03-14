import {
  Category,
  Gender,
  Item,
  ItemAttribute,
  ItemAttributeValue,
  ItemVariant,
  Prisma,
  VariantAttributeValue,
} from '@prisma/client';

import { PrismaRepository } from '../prisma-repository';

/**
 * Repository for Item entity
 */
export class ItemRepository extends PrismaRepository<
  Item,
  Prisma.ItemCreateInput,
  Prisma.ItemUpdateInput
> {
  protected modelName = 'item';

  /**
   * Find item by slug
   */
  async findBySlug(
    slug: string,
    transactionContext?: unknown,
  ): Promise<Item | null> {
    const prisma = this.getPrisma(transactionContext);

    return prisma.item.findUnique({
      where: { slug },
    });
  }

  /**
   * Find item with variants and category information
   */
  async findWithDetails(
    itemId: string,
    transactionContext?: unknown,
  ): Promise<
    | (Item & {
        variants: (ItemVariant & {
          attributeValues: (VariantAttributeValue & {
            attribute: ItemAttribute;
            attributeValue: ItemAttributeValue;
          })[];
        })[];
        category: Category;
      })
    | null
  > {
    const prisma = this.getPrisma(transactionContext);

    return prisma.item.findUnique({
      where: { id: itemId },
      include: {
        variants: {
          include: {
            attributeValues: {
              include: {
                attribute: true,
                attributeValue: true,
              },
            },
          },
        },
        category: true,
      },
    });
  }

  /**
   * Find items by category
   */
  async findByCategory(
    categoryId: string,
    transactionContext?: unknown,
  ): Promise<Item[]> {
    const prisma = this.getPrisma(transactionContext);

    return prisma.item.findMany({
      where: { categoryId },
      include: {
        variants: true,
        category: true,
      },
    });
  }

  /**
   * Find items by gender
   */
  async findByGender(
    gender: Gender,
    transactionContext?: unknown,
  ): Promise<Item[]> {
    const prisma = this.getPrisma(transactionContext);

    return prisma.item.findMany({
      where: {
        gender: {
          has: gender,
        },
      },
    });
  }
}
