import { addToCart } from './services';
import { AddToCartSchemaType } from './zod';

export type AddToCartArgs = AddToCartSchemaType;

export type AddToCartResult = Awaited<ReturnType<typeof addToCart>>;
