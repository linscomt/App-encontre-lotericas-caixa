"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.read_fileStream = exports.read_file_s = exports.read_file = exports.checkFileExists = void 0;
const fs = __importStar(require("fs"));
async function checkFileExists(file) {
    return fs.promises.access(file)
        .then(() => true)
        .catch(() => false);
}
exports.checkFileExists = checkFileExists;
async function read_file(filePathName, format = 'utf-8') {
    try {
        if (await checkFileExists(filePathName) === false) {
            console.error('Arquivo não foi encontrado:', filePathName);
            return false;
        }
        return new Promise(async (resolve) => {
            var iconv = require('iconv-lite');
            resolve(await iconv.decode(fs.readFileSync(filePathName), format, { stripBOM: false }));
        });
    }
    catch (e) {
        console.error(e);
        return false;
    }
}
exports.read_file = read_file;
function read_file_s(filePathName, format = 'utf-8') {
    try {
        fs.readFile(filePathName, function (err, contents) {
            if (err)
                throw err;
            var iconv = require('iconv-lite');
            return iconv.decode(contents, format, { stripBOM: false });
        });
    }
    catch (e) {
        console.error(e);
        return false;
    }
}
exports.read_file_s = read_file_s;
async function read_fileStream(dir, format = 'utf-8') {
    return new Promise(async (resolve) => {
        try {
            var iconv = require('iconv-lite');
            let readableStream = await iconv.decode(fs.createReadStream(dir), format, { stripBOM: false });
            await readableStream.on('error', function (error) {
                console.log(`error: ${error.message}`);
                resolve(false);
            });
            await readableStream.on('data', async (chunk) => {
                resolve(chunk);
            });
        }
        catch (e) {
            resolve(false);
        }
    });
}
exports.read_fileStream = read_fileStream;
