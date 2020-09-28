// @ts-expect-error
import { sha3_512 as wasm_sha512 } from "sha3-wasm";

export function sha512(str: string) {
  return wasm_sha512().update(str).digest('hex');
}
