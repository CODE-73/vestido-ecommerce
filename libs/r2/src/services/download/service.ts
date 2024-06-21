import { makeSignedUrl } from '../make-signed-url';
import { DownloadFileRequest, DownloadFileResponse } from './types';

export async function downloadFile({
  key,
}: DownloadFileRequest): Promise<DownloadFileResponse> {
  const url = await makeSignedUrl({
    requestType: 'GET',
    key: key,
    expiresIn: 3600,
  });
  return { url };
}
