import * as Crypto from "crypto-js";

export function convertWordArrayToUint8Array(wordArray: Crypto.lib.WordArray) {
  const l = wordArray.sigBytes;
  const words = wordArray.words;
  const result = new Uint8Array(l);
  let i = 0 /*dst*/,
    j = 0; /*src*/
  while (true) {
    // here i is a multiple of 4
    if (i === l) break;
    const w = words[j++];
    result[i++] = (w & 0xff000000) >>> 24;
    if (i === l) break;
    result[i++] = (w & 0x00ff0000) >>> 16;
    if (i === l) break;
    result[i++] = (w & 0x0000ff00) >>> 8;
    if (i === l) break;
    result[i++] = w & 0x000000ff;
  }
  return result;
}

export function convertUint8ArrayToWordArray(
  u8Array: Uint8Array
): Crypto.lib.WordArray {
  const words = [],
    len = u8Array.length;
  let i = 0;

  while (i < len) {
    words.push(
      (u8Array[i++] << 24) |
        (u8Array[i++] << 16) |
        (u8Array[i++] << 8) |
        u8Array[i++]
    );
  }

  return Crypto.lib.WordArray.create(words, len);
}

export function convertStringUint8Array(str: string): Uint8Array {
  // only works for ASCII!
  const bufView = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return bufView;
}

export function convertDataUriUint8Array(uri: string): Uint8Array {
  const [, s] = uri.split(",");
  return convertStringUint8Array(atob(s));
}
