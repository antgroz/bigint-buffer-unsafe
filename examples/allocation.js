const { writeBigIntToBuffer, sizeOfBigIntAsBuffer } = require('../bbu')

function writeBigIntToBufferAllocated (bigint) {
  const bytes = sizeOfBigIntAsBuffer(bigint)
  const buffer = Buffer.allocUnsafe(bytes)

  writeBigIntToBuffer(bytes, buffer)

  return buffer
}

module.exports = {
  writeBigIntToBufferAllocated
}
