import { makeSignedUrl } from '../make-signed-url';
import { FileUploadEvent, UploadFileRequest } from './types';
import { EventIterator } from 'event-iterator';

export async function uploadFile({ key, fileContents }: UploadFileRequest) {
  console.info('Starting upload', { key, fileContents });
  const url = await makeSignedUrl({
    requestType: 'UPLOAD',
    key: key,
    expiresIn: 3600,
  });

  return new EventIterator<FileUploadEvent>(({ push, stop, fail }) => {
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', getContentType(fileContents));
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 10000) / 100;
        push({ key, progress, uploadDone: false });
      }
    };

    xhr.send(fileContents);
    xhr.onload = () => {
      if (xhr.status === 200) {
        push({ key, progress: 100, uploadDone: true });
        stop();
      } else {
        fail(new Error('Failed to upload file'));
      }
    };

    return () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        // Cancel the upload if it's still in progress
        xhr.abort();
      }
    };
  });
}

function getContentType(file: Blob | Buffer) {
  let fileType = 'application/octet-stream';
  if ('type' in file) {
    fileType = file.type;
  }
  return fileType;
}
