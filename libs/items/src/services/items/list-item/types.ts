import { Item } from '@prisma/client';

export type ListItemResponse = {
  data: Item[];
};
