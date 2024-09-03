import * as jwt from 'jsonwebtoken';

import { TokenPayload } from '../types';

const SECRET = (process.env['JWT_TOKEN_SECRET'] as string) || 'SECRET';

export async function makeJWTToken(args: TokenPayload) {
  return new Promise((resolve, reject) => {
    jwt.sign(args, SECRET, (err: Error | null, token?: string) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}
