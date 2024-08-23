import { type Category as _Category } from '@prisma/client';

export type GenerateCategorySearchTermsResponse = {
  id: string;
  name: string;
  slug: string;
  searchTerms: string[];
};

export type Category = Pick<
  _Category,
  'id' | 'name' | 'slug' | 'gender' | 'parentCategoryId'
>;
