// import { ZodError } from 'zod';

import {
  authMiddleware,
  getAuthContext,
  getProfile,
  updateProfile,
} from '@vestido-ecommerce/auth';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export const GET = apiRouteHandler(authMiddleware, async () => {
  const auth = getAuthContext();
  const currentUser = await getProfile(auth.profileId);
  return currentUser;
});

export const PUT = apiRouteHandler(authMiddleware, async ({ request }) => {
  const auth = getAuthContext();
  const body = await request.json();
  const currentUser = await updateProfile(auth.profileId, body);
  return currentUser;
});
