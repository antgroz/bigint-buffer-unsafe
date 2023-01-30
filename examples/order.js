const { writeBigIntToBuffer, readBigIntFromBuffer } = require('../bbu')

function swapWords (buffer) {
  new BigUint64Array(buffer.buffer).reverse()
}

function readBigIntFromBufferLeastSignificantWordFirst (buffer) {
  return readBigIntFromBuffer(buffer)
}

function readBigIntFromBufferMostSignificantWordFirstUnsafe (buffer) {
  buffer = buffer.subarray(0, (buffer.length >> 3) << 3)
  swapWords(buffer)

  return readBigIntFromBuffer(buffer)
}

function readBigIntFromBufferMostSignificantWordFirst (buffer) {
  buffer = buffer.subarray(0, (buffer.length >> 3) << 3)
  buffer = Uint8Array.prototype.slice.call(buffer)
  swapWords(buffer)

  return readBigIntFromBuffer(buffer)
}

function writeBigIntToBufferLeastSignificantWordFirst (bigint, buffer) {
  return writeBigIntToBuffer(bigint, buffer)
}

function writeBigIntToBufferMostSignificantWordFirst (bigint, buffer) {
  const bytes = writeBigIntToBuffer(bigint, buffer)

  buffer = buffer.subarray(0, bytes)
  swapWords(buffer)

  return bytes
}

module.exports = {
  readBigIntFromBufferLeastSignificantWordFirst,
  readBigIntFromBufferMostSignificantWordFirstUnsafe,
  readBigIntFromBufferMostSignificantWordFirst,
  writeBigIntToBufferLeastSignificantWordFirst,
  writeBigIntToBufferMostSignificantWordFirst
}
