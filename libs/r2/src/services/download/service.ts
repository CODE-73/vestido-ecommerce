import { makeSignedUrl } from '../make-signed-url';
import { DownlaodFileRequest, DownlaodFileResponse } from './types';

export async function downloadFile({
  key,
}: DownlaodFileRequest): Promise<DownlaodFileResponse> {
  const url = await makeSignedUrl({
    requestType: 'GET',
    key: key,
    expiresIn: 3600,
  });
  return { url };
}
