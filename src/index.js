import chalk from "chalk";
import stripAnsi from 'strip-ansi';
import { DateTime } from "luxon";

/**
 * Возвращает форматированные дату и время.
 * @param {string} timezone - Часовой пояс (например, "Europe/Moscow").
 * @returns {{ Time: string, Date: string }} Объект с текущими временем и датой.
 */
const getTimeAndDate = (timezone) => {
    const now = DateTime.now().setZone(timezone);
    if (!now.isValid) {
        throw new Error('Некорректный часовой пояс');
    }

    return {
        Time: now.toFormat('HH:mm:ss'),
        Date: now.toFormat('dd.MM.yyyy')
    };
};

class Terminal {
    /**
     * Создает экземпляр Terminal.
     * @param {string} [timezone="Europe/Moscow"] - Часовой пояс по умолчанию.
     */
    constructor(timezone = "Europe/Moscow") {
        /**
         * @type {string}
         */
        this.timezone = timezone;
    }

    /**
     * Форматирует сообщение с префиксом и текущим временем/датой.
     * @param {string} prefix - Тип или категория сообщения (например, "INFO", "ERROR").
     * @param {string} message - Основной текст сообщения.
     * @param {string|null} [debug=null] - Дополнительная отладочная информация.
     * @returns {string} Отформатированная строка.
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
     * Заменяет вхождения вида /color(текст)/ на соответствующий chalk.<color>(текст)
     * Поддерживаются цвета chalk (yellow, blue, green, red, cyan, magenta и т.д.)
     * @param {string} message - Исходное сообщение.
     * @returns {string} Сообщение с применёнными цветами.
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
     * Удаляет цветовые коды из текста (если используются chalk или ANSI escape codes).
     * @param {string} text - Текст с цветами.
     * @returns {string} Очищенный от цвета текст.
     */
    clearColour(text) {
        return stripAnsi(text);
    }

    /**
     * Выводит обычное информационное сообщение в консоль.
     * @param {string} text - Сообщение.
     */
    Message(text) {
        console.log(this.format(chalk.cyan("INFO"), text));
    }

    /**
     * Выводит сообщение об ошибке в консоль.
     * @param {string} message - Текст ошибки.
     * @param {string|null} [debug=null] - Дополнительная информация (stack trace, детали).
     */
    Error(message, debug = null) {
        console.error(this.format(chalk.red("ERROR"), message, debug ?? null));
    }

    /**
     * Выводит предупреждение в консоль.
     * @param {string} message - Текст предупреждения.
     */
    Warning(message) {
        console.warn(this.format(chalk.yellow("WARNING"), message));
    }
}