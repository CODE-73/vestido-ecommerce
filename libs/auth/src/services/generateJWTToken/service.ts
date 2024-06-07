import * as jwt from 'jsonwebtoken';

export async function makeJWTToken(id: string) {
  return new Promise((resolve, reject) => {
    jwt.sign({ id: id }, 'SECRET', (err: Error | null, token?: string) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}
