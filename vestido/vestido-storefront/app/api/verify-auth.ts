import { verifyJWTToken } from '@vestido-ecommerce/auth';

type VerifyResponse =
  | {
      authenticated: false;
      reason: string;
    }
  | {
      authenticated: true;
      token: string;
      profileId: string;
      data: unknown;
    };

export async function verifyAuth(request: Request): Promise<VerifyResponse> {
  try {
    const authorizationHeader = request.headers.get('Authorization');
    const token = authorizationHeader?.split(' ')[1];

    if (!token) {
      return {
        authenticated: false,
        reason: 'Token is missing',
      };
    }

    const decodedToken = await verifyJWTToken(token as string);
    return {
      authenticated: true,
      token,
      // @ts-expect-error TODO: Type this better
      profileId: JSON.parse(decodedToken).id,
      data: decodedToken,
    };
  } catch (e) {
    return {
      authenticated: false,
      reason: 'Invalid Token',
    };
  }
}
