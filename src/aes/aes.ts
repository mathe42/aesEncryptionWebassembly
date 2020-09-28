// @ts-expect-error
import { aes256 } from 'aes-wasm';
import { isHexString, parseHexString, stringFromTypedArray, stringToTypedArray } from './utils';
import { sha512 } from '../sha512';

/*************
 * Main AES
 *************/

export async function createAESContext(pwd: string, iv: string, doHex = false) {
  if (doHex || !isHexString(pwd)) {
    pwd = sha512(pwd);
  }

  if (pwd.length < 64) {
    throw "Your Hex-Password is less than 64 chars long wich is not supported. Please provide a longer string or call this function with init('<MY-HEXED-KEY>', '<MY-HEXED-IV>', true)";
  }

  if (doHex || !isHexString(iv)) {
    iv = sha512(iv);
  }

  if (iv.length < 32) {
    throw "Your initialization vector is less than 32 chars long wich is not supported. Please provide a longer string or call this function with init('<MY-HEXED-KEY>', '<MY-HEXED-IV>', true)";
  }

  const password = parseHexString(pwd.substr(0, 64));
  const initialization_vector = parseHexString(iv.substr(0, 32));

  const _aes = await aes256();
  _aes.init(password, initialization_vector, 'CTR');

  return {
    encrypt<T extends string>(str: T) {
      return btoa(stringFromTypedArray(_aes.encrypt(stringToTypedArray(str))));
    },
    decrypt<T extends string>(data: T) {
      return stringFromTypedArray(_aes.decrypt(stringToTypedArray(atob(data))));
    }
  };
}
