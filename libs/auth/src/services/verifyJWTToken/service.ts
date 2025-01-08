import * as jwt from 'jsonwebtoken';

import { TokenPayload } from '../types';

const SECRET = (process.env['JWT_TOKEN_SECRET'] as string) || 'SECRET';

export async function verifyJWTToken(token: string) {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(
      token,
      SECRET,
      (err: jwt.VerifyErrors | null, decoded?: object | string) => {
        if (err) {
          reject(err);
        } else {
          if (typeof decoded === 'string') {
            resolve(JSON.parse(decoded));
          } else {
            resolve(decoded as TokenPayload);
          }
        }
      },
    );
  });
}
