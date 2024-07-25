import { getPrismaClient } from '@vestido-ecommerce/models';

import { UpdateAttributeSchema, UpdateAttributeSchemaType } from './zod';

export async function updateAttribute(
  attributeId: string,
  data: UpdateAttributeSchemaType,
) {
  const prisma = getPrismaClient();

  const validatedData = UpdateAttributeSchema.parse(data);

  await prisma.$transaction(async (prisma) => {
    // Update ItemAttribute fields( except itemAttributeValues)
    const updatedAttribute = await prisma.itemAttribute.update({
      where: {
        id: attributeId,
      },
      data: {
        name: validatedData.name,
        description: validatedData.description,
      },
    });

    // Get Existing DB Ids
    const currentValues = await prisma.itemAttributeValue.findMany({
      where: { attributeId: attributeId },
    });

    const dbIds = Array.from(new Set(currentValues.map((value) => value.id)));
    const incomingIds = new Set(
      validatedData.itemAttributeValues
        ?.map((value) => value.id)
        .filter((id) => !!id),
    );

    // Delete ItemAttributeValues that are not in the request
    const idsToDelete = dbIds.filter((id) => !incomingIds.has(id));
    if (idsToDelete.length > 0) {
      await prisma.itemAttributeValue.deleteMany({
        where: { id: { in: idsToDelete } },
      });
    }

    // Upsert ItemAttributeValues
    if (validatedData.itemAttributeValues) {
      for (const value of validatedData.itemAttributeValues) {
        if (value.id) {
          // Update existing ItemAttributeValue
          await prisma.itemAttributeValue.update({
            where: { id: value.id },
            data: { value: value.value },
          });
        } else {
          // Create new ItemAttributeValue
          await prisma.itemAttributeValue.create({
            data: {
              value: value.value,
              attributeId: attributeId,
            },
          });
        }
      }
    }

    return updatedAttribute;
  });
}
