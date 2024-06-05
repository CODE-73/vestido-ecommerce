export function makeUploadKey(keyPrefix: string, file: File) {
  const parts = file.name.split('.');

  const fileExtension = parts[parts.length - 1];

  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nonce = '';
  for (let i = 0; i < 16; i++) {
    nonce += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return `${keyPrefix}${nonce}.${fileExtension}`;
}
