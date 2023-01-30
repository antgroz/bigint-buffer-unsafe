const { writeBigIntToBuffer, readBigIntFromBuffer } = require('../bbu')

function readBigIntFromBufferTruncated (buffer) {
  return readBigIntFromBuffer(buffer)
}

function readBigIntFromBufferUntruncated (buffer) {
  const padding = Buffer.alloc(((buffer.length + 7) >> 3) << 3)
  buffer = Buffer.concat([buffer, padding])

  return readBigIntFromBuffer(buffer)
}

module.exports = {
  readBigIntFromBufferTruncated,
  readBigIntFromBufferUntruncated
}
