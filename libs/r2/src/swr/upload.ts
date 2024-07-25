import useSWRSubscription, { type SWRSubscription } from 'swr/subscription';
import { R2SWRKeys } from './keys';
import {
  uploadFile,
  UploadFileRequest,
  FileUploadEvent,
} from '../services/upload';

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export function useR2Upload(args: Nullable<UploadFileRequest>) {
  const key =
    args.key && args.fileContents ? [R2SWRKeys.UPLOAD, args.key] : null;

  const sub: SWRSubscription<string[] | null, FileUploadEvent, Error> = (
    _,
    { next },
  ) => {
    (async () => {
      for await (const progress of await uploadFile(
        args as UploadFileRequest,
      )) {
        next(null, progress);
      }
    })();

    return () => {
      // Cleanup
    };
  };

  return useSWRSubscription<FileUploadEvent, Error, string[] | null>(key, sub);
}
