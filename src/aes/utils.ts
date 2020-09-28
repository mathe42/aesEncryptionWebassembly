export function parseHexString(str: string) {
  let a = [];

  for (var i = 0; i < str.length; i += 2) {
    a.push("0x" + str.substr(i, 2));
  }

  return a.map(v => parseInt(v, 16));
}
export function isHexString(str: string) {
  return /^([a-f|0-9]+)$/.test(str);
}
export function stringToTypedArray(str: string) {
  return new Int8Array(str.split('').map((v) => v.charCodeAt(0)));
}
export function stringFromTypedArray(arr: Int8Array) {
  return String.fromCharCode(...arr);
}
