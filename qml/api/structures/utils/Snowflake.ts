export type Snowflake = string & { __TYPE__: "Snowflake"};

// Discord epoch (2015-01-01T00:00:00.000Z)
const EPOCH = 1420070400000;
let INCREMENT = 0;

function repeat(str: string, count: number) {
    var maxCount = str.length * count;
    count = Math.floor(Math.log(count) / Math.log(2));
    while (count) {
       str += str;
       count--;
    }
    str += str.substring(0, maxCount - str.length);
    return str;
}

function padStart(input: string, targetLength: number, padString: string) {
    targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
    padString = String((typeof padString !== 'undefined' ? padString : ' '));
    if (input.length > targetLength) {
        return String(input);
    }
    else {
        targetLength = targetLength-input.length;
        if (targetLength > padString.length) {
            padString += repeat(padString, targetLength / padString.length); //append to original to ensure we are longer than needed
        }
        return padString.slice(0,targetLength) + String(input);
    }
};

/**
 * A container for useful snowflake-related methods.
 */
export const Snowflake = {
  /**
   * A Twitter snowflake, except the epoch is 2015-01-01T00:00:00.000Z
   * ```
   * If we have a snowflake '266241948824764416' we can represent it as binary:
   *
   * 64                                          22     17     12          0
   *  000000111011000111100001101001000101000000  00001  00000  000000000000
   *       number of ms since Discord epoch       worker  pid    increment
   * ```
   * @typedef {string} Snowflake
   */

  /**
   * Generates a Discord snowflake.
   * <info>This hardcodes the worker ID as 1 and the process ID as 0.</info>
   * @param {number|Date} [timestamp=Date.now()] Timestamp or date of the snowflake to generate
   * @returns {Snowflake} The generated snowflake
   */
  generate(timestamp: Date | number = Date.now()) {
    if (timestamp instanceof Date) timestamp = timestamp.getTime();
    if (typeof timestamp !== 'number' || isNaN(timestamp)) {
      throw new TypeError(
        `"timestamp" argument must be a number (received ${isNaN(timestamp) ? 'NaN' : typeof timestamp})`,
      );
    }
    if (INCREMENT >= 4095) INCREMENT = 0;
    const BINARY = `${padStart((timestamp - EPOCH).toString(2), 42, '0')}0000100000${padStart(
        (INCREMENT++).toString(2), 12, '0')}`;
    return this.binaryToID(BINARY);
  },

  /**
   * A deconstructed snowflake.
   * @typedef {Object} DeconstructedSnowflake
   * @property {number} timestamp Timestamp the snowflake was created
   * @property {Date} date Date the snowflake was created
   * @property {number} workerID Worker ID in the snowflake
   * @property {number} processID Process ID in the snowflake
   * @property {number} increment Increment in the snowflake
   * @property {string} binary Binary representation of the snowflake
   */

  /**
   * Deconstructs a Discord snowflake.
   * @param {Snowflake} snowflake Snowflake to deconstruct
   * @returns {DeconstructedSnowflake} Deconstructed snowflake
   */
  deconstruct(snowflake: Snowflake) {
    const BINARY = padStart(this.idToBinary(snowflake).toString(), 64, '0');
    const res = {
      timestamp: parseInt(BINARY.substring(0, 42), 2) + EPOCH,
      workerID: parseInt(BINARY.substring(42, 47), 2),
      processID: parseInt(BINARY.substring(47, 52), 2),
      increment: parseInt(BINARY.substring(52, 64), 2),
      binary: BINARY
    };
    return res;
  },

  /**
   * Discord's epoch value (2015-01-01T00:00:00.000Z).
   * @type {number}
   * @readonly
   */
  EPOCH() {
    return EPOCH;
  },

  /**
   * Transforms a snowflake from a decimal string to a bit string.
   * @param  {Snowflake} num Snowflake to be transformed
   * @returns {string}
   * @private
   */
   idToBinary(num: Snowflake): string {
    let bin = '';
    let high = parseInt(num.slice(0, -10)) || 0;
    let low = parseInt(num.slice(-10));
    while (low > 0 || high > 0) {
      bin = String(low & 1) + bin;
      low = Math.floor(low / 2);
      if (high > 0) {
        low += 5000000000 * (high % 2);
        high = Math.floor(high / 2);
      }
    }
    return bin;
  },

  /**
   * Transforms a snowflake from a bit string to a decimal string.
   * @param  {string} num Bit string to be transformed
   * @returns {Snowflake}
   * @private
   */
  binaryToID(num: string): Snowflake {
    let dec = '';

    while (num.length > 50) {
      const high = parseInt(num.slice(0, -32), 2);
      const low = parseInt((high % 10).toString(2) + num.slice(-32), 2);

      dec = (low % 10).toString() + dec;
      num =
        Math.floor(high / 10).toString(2) +
        padStart(Math.floor(low / 10).toString(), 32, '0');
    }

    let nnum = parseInt(num, 2);
    while (nnum > 0) {
      dec = (nnum % 10).toString() + dec;
      nnum = Math.floor(nnum / 10);
    }

    return dec as Snowflake;
  }
}
