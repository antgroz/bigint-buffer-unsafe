/**
 * Get the size of a BigInt in bytes.
 *
 * Returns the number of bytes required to represent the absolute value of
 * a BigInt as a sequence of 8-byte words.
 *
 * @param bigint BigInt value
 * @returns BigInt size in bytes
 */
export function sizeOfBigIntAsBuffer(bigint: bigint): number;

/**
 * Write the absolute value of a BigInt into its Buffer representation.
 *
 * Writes the binary representation of the absolute value of a BigInt into the
 * provided Buffer. The BigInt is written in a sequence of 8-byte words, starting
 * with the least significant word. The endianness of the words is native to
 * the architecture and is not guaranteed to be stable across platforms.
 * If the Buffer does not have enough length to represent the BigInt in full,
 * the words are truncated at the last one that fits into the Buffer. Returns
 * the number of the number of bytes that was written into the Buffer.
 *
 * @param bigint BigInt value
 * @param buffer Buffer where the BigInt representation is written
 * @returns Number of bytes written
 */
export function writeBigIntToBuffer(bigint: bigint, buffer: Buffer): number;

/**
 * Read the absolute value of a BigInt from its Buffer representation.
 *
 * Reads the absolute value of a BigInt from the entire contents of the
 * provided Buffer. The contents of the Buffer are interpreted as a sequence
 * of 8-byte words, starting with the least significant word. The endianness
 * of the words is interpreted as native to the architecture and is thus
 * not guaranteed to be stable across platforms. If the buffer length modulo 8
 * is not zero, the remaining bytes that do not fit into a full 8-byte word
 * are ignored. Returns the interpreted BigInt.
 *
 * @param buffer Buffer where the BigInt representation is written
 * @returns BigInt value
 */
export function readBigIntFromBuffer(buffer: Buffer): bigint;
