const { sizeOfBigIntAsBuffer, writeBigIntToBuffer, readBigIntFromBuffer } = require('../bbu')

function assertBigInt (value) {
  if (typeof value !== 'bigint') {
    throw new Error('not a bigint')
  }
}

function assertBuffer (value) {
  if (!Buffer.isBuffer(value)) {
    throw new Error('not a buffer')
  }
}

function sizeOfBigIntAsBufferChecked (bigint) {
  assertBigInt(bigint)

  return sizeOfBigIntAsBuffer(bigint)
}

function writeBigIntToBufferChecked (bigint, buffer) {
  assertBigInt(bigint)
  assertBuffer(buffer)

  return writeBigIntToBuffer(bigint, buffer)
}

function readBigIntFromBufferChecked (buffer) {
  assertBuffer(buffer)

  return readBigIntFromBuffer(buffer)
}

module.exports = {
  sizeOfBigIntAsBufferChecked,
  writeBigIntToBufferChecked,
  readBigIntFromBufferChecked
}
