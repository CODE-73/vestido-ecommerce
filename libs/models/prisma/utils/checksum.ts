import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

export function checksum(filePath: string, algorithm = 'sha256') {
  return new Promise<string>((resolve, reject) => {
    const hash = crypto.createHash(algorithm);
    const stream = fs.createReadStream(filePath);

    // Use the filename and content for the checksum
    hash.update(path.basename(filePath));
    stream.on('data', (data) => hash.update(data));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}
