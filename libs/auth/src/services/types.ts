import { type Role } from '@prisma/client';

export type TokenPayload = {
  id: string;
  fullName: string;
  role: Role;
  email: string | null;
  mobile: string | null;
};
