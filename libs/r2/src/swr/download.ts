import useSWRMutation from 'swr/mutation';

import {
  downloadFile,
  DownloadFileRequest,
  DownloadFileResponse,
} from './../services/download';
import { R2SWRKeys } from './keys';

export function useR2Download() {
  const key = [R2SWRKeys.DOWNLOAD];
  return useSWRMutation<
    DownloadFileResponse,
    Error,
    string[] | null,
    DownloadFileRequest
  >(key, (_, { arg }) => downloadFile(arg));
}
