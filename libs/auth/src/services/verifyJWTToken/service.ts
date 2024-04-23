import * as jwt from 'jsonwebtoken';

export async function verifyJWTToken(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      'SECRET',
      (err: jwt.VerifyErrors | null, decoded?: object | string) => {
        if (err) {
          reject(err);
        } else {
          // If decoded is a string, it represents the decoded payload
          // Otherwise, it represents the decoded payload as an object
          if (typeof decoded === 'string') {
            resolve(decoded);
          } else {
            // Convert the decoded object to a JSON string
            resolve(JSON.stringify(decoded));
          }
        }
      }
    );
  });
}
