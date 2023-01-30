const { randomBytes } = require('node:crypto')
const bench = require('nanobench')
const { sizeOfBigIntAsBuffer, writeBigIntToBuffer, readBigIntFromBuffer } = require('./bbu')

function wordsToBytes (sz) {
  return sz * 8
}

function allocWords (sz) {
  const bytes = wordsToBytes(sz)
  return Buffer.alloc(bytes)
}

function randomWords (sz) {
  const bytes = wordsToBytes(sz)
  return randomBytes(bytes)
}

function randomBigInt (sz) {
  const bytes = wordsToBytes(sz)
  const buf = randomBytes(bytes)

  let val = 0n
  for (let i = 0; i < buf.length; i += 8) {
    const word = buf.readBigUint64LE(i)
    val = val << (64n + word)
  }

  return val
}

const small = 1
const large = 1024
const reps = 1e6

for (const [type, words] of Object.entries({ small, large })) {
  bench(`sizeOfBigIntAsBuffer ${type} ${reps} times`, function (b) {
    const val = randomBigInt(words)

    b.start()

    for (let i = 0; i < reps; ++i) {
      sizeOfBigIntAsBuffer(val)
    }

    b.end()
  })

  bench(`writeBigIntToBuffer ${type} ${reps} times`, function (b) {
    const buf = allocWords(words)
    const val = randomBigInt(words)

    b.start()

    for (let i = 0; i < reps; ++i) {
      writeBigIntToBuffer(val, buf)
    }

    b.end()
  })

  bench(`readBigIntFromBuffer ${type} ${reps} times`, function (b) {
    const buf = randomWords(words)

    b.start()

    for (let i = 0; i < reps; ++i) {
      readBigIntFromBuffer(buf)
    }

    b.end()
  })
}
