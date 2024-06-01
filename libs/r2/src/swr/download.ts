import { R2SWRKeys } from './keys';
import useSWRMutation from 'swr/mutation';
import {
  DownlaodFileResponse,
  DownlaodFileRequest,
  downloadFile,
} from './../services/download';

export function useR2Download() {
  const key = [R2SWRKeys.DOWNLOAD];
  return useSWRMutation<
    DownlaodFileResponse,
    Error,
    string[] | null,
    DownlaodFileRequest
  >(key, (_, { arg }) => downloadFile(arg));
}
