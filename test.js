const test = require('node:test')
const assert = require('node:assert')
const { sizeOfBigIntAsBuffer, writeBigIntToBuffer, readBigIntFromBuffer } = require('./bbu')

const fixtures = [
  {
    sz: 0,
    val: {
      norm: 0n,
      denorm: 0n
    },
    buf: {
      norm: Buffer.alloc(0),
      denorm: Buffer.alloc(10)
    }
  },
  {
    sz: 8,
    val: {
      norm: 1n,
      denorm: -1n
    },
    buf: {
      norm: Buffer.from('0100000000000000', 'hex'),
      denorm: Buffer.from('0100000000000000fe52', 'hex')
    }
  },
  {
    sz: 16,
    val: {
      norm: 0x9d49a7a99a083d4aa26a35d82df03f03n,
      denorm: -0x9d49a7a99a083d4aa26a35d82df03f03n
    },
    buf: {
      norm: Buffer.from('033ff02dd8356aa24a3d089aa9a7499d', 'hex'),
      denorm: Buffer.from('033ff02dd8356aa24a3d089aa9a7499d2983', 'hex')
    }
  },
  {
    sz: 24,
    val: {
      norm: 0xaa9d49a7a99a083d4aa26a35d82df03f03n,
      denorm: -0xaa9d49a7a99a083d4aa26a35d82df03f03n
    },
    buf: {
      norm: Buffer.from('033ff02dd8356aa24a3d089aa9a7499daa00000000000000', 'hex'),
      denorm: Buffer.from('033ff02dd8356aa24a3d089aa9a7499daa00000000000000a933', 'hex')
    }
  }
]

for (const f of fixtures) {
  test(`sizeOfBigIntAsBuffer(${f.val.norm}n)`, () => {
    assert.strictEqual(sizeOfBigIntAsBuffer(f.val.norm), f.sz)
  })

  test(`sizeOfBigIntAsBuffer(${f.val.denorm}n)`, () => {
    assert.strictEqual(sizeOfBigIntAsBuffer(f.val.denorm), f.sz)
  })

  test(`writeBigIntToBuffer(${f.val.norm}n)`, () => {
    const buffer = Buffer.alloc(f.sz)
    assert.strictEqual(writeBigIntToBuffer(f.val.norm, buffer), f.sz)
    assert.deepEqual(buffer, f.buf.norm)
  })

  test(`writeBigIntToBuffer(${f.val.denorm}n)`, () => {
    const buffer = Buffer.alloc(f.sz)
    assert.strictEqual(writeBigIntToBuffer(f.val.denorm, buffer), f.sz)
    assert.deepEqual(buffer, f.buf.norm)
  })

  test(`readBigIntFromBuffer('0x${f.buf.norm.toString('hex')}')`, () => {
    assert.deepEqual(readBigIntFromBuffer(f.buf.norm), f.val.norm)
  })

  test(`readBigIntFromBuffer('0x${f.buf.denorm.toString('hex')}')`, () => {
    assert.deepEqual(readBigIntFromBuffer(f.buf.denorm), f.val.norm)
  })
}
