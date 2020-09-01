// Modules
// External
import { writeFileSync, readFileSync } from 'fs';
import { Chalk } from 'chalk';

// Internal
import { Levels, logSkel } from './utils';
//

export const sendLog = (
    color: Chalk,
    message: string,
    level: Levels | string,
    symbol: string,
    timestamp: Date | string
): void => {
    return console.log(
        color(
            `[ ${symbol} ${firstLetterToUppercase(
                level
            )} :: ${timestamp} ] :: ${message}`
        )
    );
};

export const firstLetterToUppercase = (text: string | Levels): string => {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};

export const logInFile = (path: string, data: logSkel): void => {
    let file = readFileSync(path, 'utf-8');

    if (file.length === 0) {
        writeFileSync(path, '{"logs": []}');
        file = readFileSync(path, 'utf-8');
    }

    const jsonData: any = JSON.parse(file);
    jsonData.logs.push(data);
    writeFileSync(path, JSON.stringify(jsonData, null, 4));
};
