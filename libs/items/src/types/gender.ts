import { type Gender } from '@prisma/client';

export { type Gender };

export const Genders = ['MEN', 'WOMEN', 'BOYS', 'GIRLS'] satisfies Gender[];
