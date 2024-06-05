export type UploadFileRequest = {
  key: string;
  fileContents: Blob | Buffer;
};

export type FileUploadEvent = {
  key: string;
  progress: number;
  uploadDone: boolean;
};
