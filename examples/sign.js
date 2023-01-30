const { writeBigIntToBuffer, readBigIntFromBuffer } = require('../bbu')

function readBigIntFromBufferSigned (buffer) {
  const bigint = readBigIntFromBuffer(buffer.subarray(1))

  return buffer[0] ? -bigint : bigint
}

function writeBigIntToBufferSigned (bigint, buffer) {
  if (!buffer.length) {
    return 0
  }

  buffer[0] = bigint < 0 ? 1 : 0

  return writeBigIntToBuffer(bigint, buffer.subarray(1)) + 1
}

module.exports = {
  readBigIntFromBufferSigned,
  writeBigIntToBufferSigned
}
