/**
 * Get the size of a BigInt in bytes.
 *
 * Returns the exact length of a buffer that can be used to represent the
 * absolute value of the BigInt precisely and unambiguously.
 *
 * @param value BigInt value
 * @returns BigInt size in bytes
 */
export function sizeOfBigIntAsBuffer(value: bigint): number;

/**
 * Write the absolute value of a BigInt into its Buffer representation.
 *
 * The BigInt is written in chunks of 8 bytes, starting with the least
 * significant one. The endianness of chunks is platform-dependent and is not
 * portable. If the buffer length is not divisible by 8, the length remainder
 * modulo 8 is not used. If the number of usable bytes is insufficient
 * to represent the BigInt precisely, its value is truncated to the
 * available length.
 *
 * @param value BigInt value
 * @param buffer Buffer where the BigInt representation is written
 */
export function writeBigIntToBuffer(value: bigint, buffer: Buffer): void;

/**
 * Read the absolute value of a BigInt from its Buffer representation.
 *
 * The BigInt is read as a sequence of 8-byte chunks starting with the least
 * significant one. The endianness of chunks is determined based on the
 * platform and is not portable. If the buffer length is not divisible by 8,
 * the length remainder modulo 8 is ignored.
 *
 * @param buffer Buffer where the BigInt representation is written
 * @returns BigInt value
 */
export function readBigIntFromBuffer(buffer: Buffer): bigint;
