# bigint-buffer-unsafe

Fast native utilities for conversion between BigInt and Buffer for Node.js.

The functions in this package are unsafe low-level bindings to Node-API
that provide the base building blocks for converting between BigInt values and
their binary representations as Buffer instances.

These functions have minimal overhead over pure Node-API calls and are but
thin wrappers around them. For this reason, they are inherently unsafe and
do not provide many of the security and usability guarantees, like argument
validation, platform support, and common conversion options. The primary focus
of these utilities is raw performance and extensibility towards higher-level
interfaces.

## Install

For widely used targets, the prebuilt binaries are already included into the
package and are resolved automatically upon installation. If a prebuilt
binary is not found, a suitable set of compilation tools should be installed
prior to installing the package (see [node-gyp] for details).

Prebuilt binaries are provided for the following targets.

- Linux arm64
- Linux x64
- MacOS arm64
- MacOS x64
- Windows x64
- Windows x86

## Usage

```js
const {
  sizeOfBigIntAsBuffer,
  writeBigIntToBuffer,
  readBigIntFromBuffer
} = require('bigint-buffer-unsafe')

const a = 324773378461380291323057794237044257169n

const bytes = sizeOfBigIntAsBuffer(a)
const buffer = Buffer.allocUnsafe(bytes)
writeBigIntToBuffer(a, buffer)

const b = readBigIntFromBuffer(buffer) // 324773378461380291323057794237044257169n
```

## API

### `sizeOfBigIntAsBuffer(bigint: bigint): number`

Returns the number of bytes required to represent the absolute value of
a BigInt as a sequence of 8-byte words.

```js
const { sizeOfBigIntAsBuffer } = require('bigint-buffer-unsafe')

sizeOfBigIntAsBuffer(0n) // 0
sizeOfBigIntAsBuffer(1n) // 8
sizeOfBigIntAsBuffer(-1n) // 8
sizeOfBigIntAsBuffer(253n) // 8
sizeOfBigIntAsBuffer(-253n) // 8
sizeOfBigIntAsBuffer(91206592176n) // 8
sizeOfBigIntAsBuffer(-91206592176n) // 8
sizeOfBigIntAsBuffer(672828860729219527658277298820292168n) // 16
sizeOfBigIntAsBuffer(-672828860729219527658277298820292168n) // 16
sizeOfBigIntAsBuffer(29561251265076120956210562186581212562560213560215n) // 24
sizeOfBigIntAsBuffer(-29561251265076120956210562186581212562560213560215n) // 24
```

### `writeBigIntToBuffer(bigint: bigint, buffer: Buffer): number`

Writes the binary representation of the absolute value of a BigInt into the
provided Buffer. The BigInt is written in a sequence of 8-byte words, starting
with the least significant word. The endianness of the words is native to
the architecture and is not guaranteed to be stable across platforms.
If the Buffer does not have enough length to represent the BigInt in full,
the words are truncated at the last one that fits into the Buffer. Returns
the number of bytes that was written into the Buffer.

```js
// NOTE: produced on Linux x64

const { writeBigIntToBuffer } = require('bigint-buffer-unsafe')

const buffer = Buffer.allocUnsafe(16)

buffer.fill(0)
writeBigIntToBuffer(0n, buffer) // 0
console.log(buffer.toString('hex')) // 00000000000000000000000000000000

buffer.fill(0)
writeBigIntToBuffer(1n, buffer) // 8
console.log(buffer.toString('hex')) // 01000000000000000000000000000000

buffer.fill(0)
writeBigIntToBuffer(-1n, buffer) // 8
console.log(buffer.toString('hex')) // 01000000000000000000000000000000

buffer.fill(0)
writeBigIntToBuffer(253n, buffer) // 8
console.log(buffer.toString('hex')) // fd000000000000000000000000000000

buffer.fill(0)
writeBigIntToBuffer(-253n, buffer) // 8
console.log(buffer.toString('hex')) // fd000000000000000000000000000000

buffer.fill(0)
writeBigIntToBuffer(91206592176n, buffer) // 8
console.log(buffer.toString('hex')) // b026563c150000000000000000000000

buffer.fill(0)
writeBigIntToBuffer(-91206592176n, buffer) // 8
console.log(buffer.toString('hex')) // b026563c150000000000000000000000

buffer.fill(0)
writeBigIntToBuffer(672828860729219527658277298820292168n, buffer) // 16
console.log(buffer.toString('hex')) // 481e9f120449578cff59692506958100

buffer.fill(0)
writeBigIntToBuffer(-672828860729219527658277298820292168n, buffer) // 16
console.log(buffer.toString('hex')) // 481e9f120449578cff59692506958100

buffer.fill(0)
writeBigIntToBuffer(29561251265076120956210562186581212562560213560215n, buffer) // 16
console.log(buffer.toString('hex')) // 97ab471e5d3a06e5c2efddadfbe98356

buffer.fill(0)
writeBigIntToBuffer(-29561251265076120956210562186581212562560213560215n, buffer) // 16
console.log(buffer.toString('hex')) // 97ab471e5d3a06e5c2efddadfbe98356
```

### `readBigIntFromBuffer(buffer: Buffer): bigint`

Reads the absolute value of a BigInt from the entire contents of the
provided Buffer. The contents of the Buffer are interpreted as a sequence
of 8-byte words, starting with the least significant word. The endianness
of the words is interpreted as native to the architecture and is thus
not guaranteed to be stable across platforms. If the buffer length modulo 8
is not zero, the remaining bytes that do not fit into a full 8-byte word
are ignored. Returns the interpreted BigInt.

```js
// NOTE: produced on Linux x64

const { readBigIntFromBuffer } = require('bigint-buffer-unsafe')

const buffer = Buffer.from('eed7e0c1fd550e0599ffa19d27a5dc63', 'hex')

readBigIntFromBuffer(buffer) // 132739226627852264702761154897099413486n
readBigIntFromBuffer(buffer.subarray(1)) // 11026235025178878167n
readBigIntFromBuffer(buffer.subarray(2)) // 18417757710238728672n
readBigIntFromBuffer(buffer.subarray(3)) // 11673217006162017729n
readBigIntFromBuffer(buffer.subarray(4)) // 11358640767885006333n
readBigIntFromBuffer(buffer.subarray(5)) // 2854615857978740309n
readBigIntFromBuffer(buffer.subarray(6)) // 11900653859453338894n
readBigIntFromBuffer(buffer.subarray(7)) // 15899157617482635525n
readBigIntFromBuffer(buffer.subarray(8)) // 7195807894198157209n
readBigIntFromBuffer(buffer.subarray(9)) // 0n
readBigIntFromBuffer(buffer.subarray(10)) // 0n
```

## Extension

The functions in the package can be extended in a variety of ways to achieve
specialized, generic, safe, unsafe, and other types of high-level interfaces
for conversion between BigInt and Buffer. To see examples of high-level
functions that can be constructed from this package, see the
[examples](./examples) directory. Currently, it contains functions that account
for automatic memory allocation, treatment of endianness, order of 8-byte words,
preservation of a BigInt sign, truncation of bytes not fitting into
8-byte words, and argument validation.

[node-gyp]: https://github.com/nodejs/node-gyp