import { R2SWRKeys } from './keys';
import useSWRMutation from 'swr/mutation';
import {
  DownloadFileResponse,
  DownloadFileRequest,
  downloadFile,
} from './../services/download';

export function useR2Download() {
  const key = [R2SWRKeys.DOWNLOAD];
  return useSWRMutation<
    DownloadFileResponse,
    Error,
    string[] | null,
    DownloadFileRequest
  >(key, (_, { arg }) => downloadFile(arg));
}
