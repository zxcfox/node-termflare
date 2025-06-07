import chalk from "chalk";
import stripAnsi from 'strip-ansi';
import { DateTime } from "luxon";

/**
 * Returns formatted date and time.
 * @param {string} timezone - Timezone (e.g., "Europe/Moscow").
 * @returns {{ Time: string, Date: string }} An object containing the current time and date.
 */
const getTimeAndDate = (timezone) => {
    const now = DateTime.now().setZone(timezone);
    if (!now.isValid) {
        throw new Error('Invalid timezone');
    }

    return {
        Time: now.toFormat('HH:mm:ss'),
        Date: now.toFormat('dd.MM.yyyy')
    };
};

class Terminal {
    /**
     * Creates a Terminal instance.
     * @param {string} [timezone="Europe/Moscow"] - Default timezone.
     */
    constructor(timezone = "Europe/Moscow") {
        /**
         * @type {string}
         */
        this.timezone = timezone;
    }

    /**
     * Formats a message with a prefix and current time/date.
     * @param {string} prefix - Message type or category (e.g., "INFO", "ERROR").
     * @param {string} message - The main message text.
     * @param {string|null} [debug=null] - Additional debug information.
     * @returns {string} The formatted message string.
     */
    format(prefix, message, debug) {
        const { Time, Date } = getTimeAndDate(this.timezone);
        let text = `[${Date} || ${Time}] ${prefix} -> ${this.parseColors(message)}`;
        if (debug) {
            text += `\r\n${chalk.gray(debug)}`;
        }
        return text;
    }

    /**
     * Replaces occurrences of /color(text)/ with chalk.<color>(text).
     * Supports chalk colors (yellow, blue, green, red, cyan, magenta, etc.).
     * @param {string} message - The input message.
     * @returns {string} The message with colors applied.
     */
    parseColors(message) {
        const parse = (str, i = 0) => {
            let result = '';

            while (i < str.length) {
                if (str[i] === '/' && /[a-z]/i.test(str[i + 1])) {
                    const match = str.slice(i + 1).match(/^(\w+)\(/);
                    if (match) {
                        const color = match[1];
                        i += 1 + color.length + 1;

                        let nested = '';
                        let depth = 1;
                        while (i < str.length && depth > 0) {
                            if (str[i] === '(') depth++;
                            else if (str[i] === ')') depth--;
                            if (depth > 0) nested += str[i];
                            i++;
                        }

                        if (str[i] === '/') i++;

                        const inner = parse(nested);
                        result += chalk[color]?.(inner) ?? chalk.gray(inner);
                        continue;
                    }
                }

                result += str[i++];
            }

            return result;
        };

        return parse(message);
    }

    /**
     * Removes color codes from the text (chalk or ANSI escape codes).
     * @param {string} text - Text with colors.
     * @returns {string} Text with colors removed.
     */
    clearColour(text) {
        return stripAnsi(text);
    }

    /**
     * Outputs a standard info message to the console.
     * @param {string} text - The message.
     */
    Message(text) {
        console.log(this.format(chalk.cyan("INFO"), text));
    }

    /**
     * Outputs an error message to the console.
     * @param {string} message - Error text.
     * @param {string|null} [debug=null] - Additional info (stack trace, details).
     */
    Error(message, debug = null) {
        console.error(this.format(chalk.red("ERROR"), message, debug ?? null));
    }

    /**
     * Outputs a warning message to the console.
     * @param {string} message - Warning text.
     */
    Warning(message) {
        console.warn(this.format(chalk.yellow("WARNING"), message));
    }
}

export default Terminal;