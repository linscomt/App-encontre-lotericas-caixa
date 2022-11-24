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
exports.write_path = exports.write_fileC = exports.write_fileB = exports.write_fileA = exports.write_file = void 0;
const fs = __importStar(require("fs"));
function write_file(filePathName, texto, formt = '') {
    return new Promise(async (resolve) => {
        try {
            if (formt !== '') {
                var iconv = require('iconv-lite');
                texto = iconv.encode(texto, formt, { stripBOM: false });
            }
            resolve(fs.appendFileSync(filePathName, texto));
        }
        catch (error) {
            console.error(error);
            resolve(false);
        }
    });
}
exports.write_file = write_file;
function write_fileA(filePathName, texto, formt = '') {
    return new Promise(async (resolve) => {
        try {
            if (formt !== '') {
                var iconv = require('iconv-lite');
                texto = iconv.encode(texto, formt, { stripBOM: false });
            }
            resolve(fs.writeFileSync(filePathName, texto));
        }
        catch (error) {
            console.error(error);
            resolve(false);
        }
    });
}
exports.write_fileA = write_fileA;
function write_fileB(filePathName, texto) {
    fs.appendFile(filePathName, texto, function (err) {
        if (err) {
            console.error(err);
            return;
        }
    });
}
exports.write_fileB = write_fileB;
function write_fileC(filePathName, texto) {
    fs.writeFile(filePathName, texto, function (err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Arquivo Criado');
    });
}
exports.write_fileC = write_fileC;
function write_path(dirPath) {
    if (!fs.existsSync(dirPath)) {
        try {
            fs.mkdirSync(dirPath);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    else
        return false;
}
exports.write_path = write_path;
function write_pathAS(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdir(dirPath, (err) => {
            if (err) {
                console.log("Deu ruim...");
                return;
            }
            console.log("Diretório criado! =)");
        });
    }
    else
        return false;
}
