import { writeFileSync, readFileSync, appendFileSync } from 'fs';
import { sep } from 'path';
import { Chalk } from 'chalk';
import { Levels, logSkel } from './utils';

const sendLog = (
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

const firstLetterToUppercase = (text: string | Levels): string => {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};

const logInFile = (path: string, filetype: string, data: logSkel): void => {
    switch (filetype.toLowerCase()) {
        case 'json':
            saveJson(path, data);
            break;
        case 'txt':
            saveTxt(path, data);
            break;
        default:
            saveJson(path, data);
            break;
    }
};

const saveJson = (path: string, data: logSkel): void => {
    let file = readFileSync(`${path}${sep}logs.json`, {
        encoding: 'utf-8',
        flag: 'a+',
    });

    if (file.length === 0) {
        writeFileSync(`${path}${sep}logs.json`, '{"logs": []}');
        file = readFileSync(`${path}${sep}logs.json`, 'utf-8');
    }

    const jsonData: any = JSON.parse(file);
    jsonData.logs.push(data);
    writeFileSync(`${path}${sep}logs.json`, JSON.stringify(jsonData, null, 4));
};

const saveTxt = (path: string, data: logSkel) => {
    const log =
        `[${data.date}] - ` +
        `${firstLetterToUppercase(data.loglevel.toString())}: ` +
        data.message +
        '\n';

    appendFileSync(`${path}${sep}logs.txt`, log, {
        encoding: 'utf-8',
    });
};

export { logInFile, firstLetterToUppercase, sendLog };
