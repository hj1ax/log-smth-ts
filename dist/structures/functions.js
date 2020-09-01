"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInFile = exports.firstLetterToUppercase = exports.sendLog = void 0;
// Modules
// External
const fs_1 = require("fs");
//
exports.sendLog = (color, message, level, symbol, timestamp) => {
    return console.log(color(`[ ${symbol} ${exports.firstLetterToUppercase(level)} :: ${timestamp} ] :: ${message}`));
};
exports.firstLetterToUppercase = (text) => {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};
exports.logInFile = (path, data) => {
    let file = fs_1.readFileSync(path, 'utf-8');
    if (file.length === 0) {
        fs_1.writeFileSync(path, '{"logs": []}');
        file = fs_1.readFileSync(path, 'utf-8');
    }
    const jsonData = JSON.parse(file);
    jsonData.logs.push(data);
    fs_1.writeFileSync(path, JSON.stringify(jsonData, null, 4));
};
