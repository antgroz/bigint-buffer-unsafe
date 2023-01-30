const os = require('node:os')
const { writeBigIntToBuffer, readBigIntFromBuffer } = require('../bbu')

function reverseWords (buffer) {
  for (let start = 0; start < buffer.length;) {
    const end = start + 8
    buffer.subarray(start, end).reverse()
    start = end
  }
}

function readBigIntFromBufferUnsafeBase (buffer, endianness) {
  if (os.endianness() !== endianness) {
    reverseWords(buffer)
  }

  return readBigIntFromBuffer(buffer)
}

function readBigIntFromBufferBase (buffer, endianness) {
  if (os.endianness() !== endianness) {
    const reordered = Buffer.allocUnsafe(buffer.length)
    reverseWords(reordered)
    buffer = reordered
  }

  return readBigIntFromBuffer(buffer)
}

function readBigIntFromBufferUnsafeLE (buffer) {
  return readBigIntFromBufferUnsafeBase(buffer, 'LE')
}

function readBigIntFromBufferUnsafeBE (buffer) {
  return readBigIntFromBufferUnsafeBase(buffer, 'BE')
}

function readBigIntFromBufferLE (buffer) {
  return readBigIntFromBufferBase(buffer, 'LE')
}

function readBigIntFromBufferBE (buffer) {
  return readBigIntFromBufferBase(buffer, 'BE')
}

function writeBigIntToBufferBase (bigint, buffer, endianness) {
  const bytes = writeBigIntToBuffer(bigint, buffer)

  if (os.endianness() !== endianness) {
    buffer = buffer.subarray(0, bytes)
    reverseWords(buffer)
  }

  return bytes
}

function writeBigIntToBufferLE (bigint, buffer) {
  return writeBigIntToBufferBase(bigint, buffer, 'LE')
}

function writeBigIntToBufferBE (bigint, buffer) {
  return writeBigIntToBufferBase(bigint, buffer, 'BE')
}

module.exports = {
  readBigIntFromBufferUnsafeLE,
  readBigIntFromBufferUnsafeBE,
  readBigIntFromBufferLE,
  readBigIntFromBufferBE,
  writeBigIntToBufferLE,
  writeBigIntToBufferBE
}
