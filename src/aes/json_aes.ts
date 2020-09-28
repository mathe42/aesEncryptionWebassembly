import { createAESContext } from './aes';

interface encryptedJsonString<T> extends String { }

export async function createAESContext_JSON(pwd: string, iv: string, doHex = false) {
  const ctx = await createAESContext(pwd, iv, doHex);

  return {
    encrypt<T extends {}>(data: T) {
      return ctx.encrypt(JSON.stringify(data)) as encryptedJsonString<T>;
    },
    decrypt<T extends {}>(data: encryptedJsonString<T>) {
      return JSON.parse(ctx.decrypt(data as string));
    }
  };
}
