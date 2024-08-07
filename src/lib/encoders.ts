export function bufferToHex(buffer: ArrayBuffer) {
  var digest = "";
  var view = new DataView(buffer);
  for (var i = 0; i < view.byteLength; i += 4) {
    // We use getUint32 to reduce the number of iterations (notice the `i += 4`)
    var value = view.getUint32(i);
    // toString(16) will transform the integer into the corresponding hex string
    // but will remove any initial "0"
    var stringValue = value.toString(16);
    // One Uint32 element is 4 bytes or 8 hex chars (it would also work with 4
    // chars for Uint16 and 2 chars for Uint8)
    var padding = "00000000";
    var paddedValue = (padding + stringValue).slice(-padding.length);
    digest += paddedValue;
  }

  return digest;
}
export function arrayBufferSha256(arrayBuffer: ArrayBuffer) {
  return crypto.subtle.digest("SHA-256", arrayBuffer).then(function (hash) {
    return bufferToHex(hash);
  });
}
