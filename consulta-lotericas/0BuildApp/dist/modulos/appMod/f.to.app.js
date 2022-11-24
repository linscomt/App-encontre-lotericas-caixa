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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.static_LOADFILES = exports.randomIntFromInterval = exports.wsleep = exports.isEmptyObject = exports.convertToUTF8 = exports.SearchTextInFile = exports.SearchTextInFileA = exports.Jafoi = exports.getLista = exports.formatNumber = exports.rigthZeros = exports.leftZeros = exports.getstrValue = exports.setstrValue = exports.decodeEntities = void 0;
const ReadWrite_file = __importStar(require("./readfile"));
const WriteFile_file = __importStar(require("./writefile"));
const line_reader_1 = __importDefault(require("line-reader"));
const readline_1 = __importDefault(require("readline"));
const fs_1 = __importDefault(require("fs"));
function decodeEntities(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp": " ",
        "amp": "&",
        "quot": "\"",
        "lt": "<",
        "gt": ">"
    };
    return encodedString.replace(translate_re, function (match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function (match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}
exports.decodeEntities = decodeEntities;
async function setstrValue(Text, TextIN, index1, index2, value) {
    try {
        let T1 = Text.split(index1);
        let T2 = T1[value].split(index2);
        let sOUT = '';
        T1.forEach((e, i) => {
            if (i < (T1.length - 1))
                sOUT += e + index1;
        });
        sOUT += TextIN + index2;
        T2.forEach((e, i) => {
            if (i > 0 && i < (T2.length - 1))
                sOUT += e + index2;
            else if (i > 0)
                sOUT += e;
        });
        return {
            success: true,
            message: sOUT
        };
    }
    catch (e) {
        return {
            success: false, message: ''
        };
    }
}
exports.setstrValue = setstrValue;
async function getstrValue(Text, index1, index2, value) {
    try {
        return {
            success: true,
            message: Text.split(index1)[value].split(index2)[0]
        };
    }
    catch (e) {
        return {
            success: false, message: ''
        };
    }
}
exports.getstrValue = getstrValue;
function isEmptyObject(obj) {
    return !!Object.values(obj).length;
}
exports.isEmptyObject = isEmptyObject;
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.randomIntFromInterval = randomIntFromInterval;
const leftZeros = (num, places) => String(num).padStart(places, '0');
exports.leftZeros = leftZeros;
const rigthZeros = (num, places) => String(num).padEnd(places, '0');
exports.rigthZeros = rigthZeros;
const formatNumber = (num, places) => String(num).padStart(places, '0');
exports.formatNumber = formatNumber;
async function wsleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
exports.wsleep = wsleep;
async function getLista(Data) {
    let lLista;
    if (Data.indexOf('<br />') > -1) {
        lLista = Data.split("<br />");
    }
    else if (Data.indexOf('<br>') > -1) {
        lLista = Data.split("<br>");
    }
    else {
        lLista = await Data.split(/\r?\n/);
    }
    return { 'Lista': lLista, 'Len': lLista.length };
}
exports.getLista = getLista;
async function static_LOADFILES(fLISTANORMAL, fLISTALOGIN, fJAFOI = 'jafoi.txt', dirPath = '\\listas\\') {
    if (fJAFOI === undefined || fJAFOI === '') {
        fJAFOI = 'jafoi.txt';
    }
    if (dirPath === undefined || dirPath === '') {
        dirPath = '\\listas\\';
    }
    let listJAFOI = '';
    listJAFOI = await ReadWrite_file.read_file(dirPath + fJAFOI);
    if (listJAFOI === false || listJAFOI === '') {
        listJAFOI = '|';
    }
    let splittarDATA = false;
    let listaLOGIN;
    if (fLISTALOGIN !== undefined && fLISTALOGIN !== '') {
        listaLOGIN = await ReadWrite_file.read_file(dirPath + fLISTALOGIN);
        if (listaLOGIN !== false) {
            listaLOGIN = await listaLOGIN.split(/\r?\n/);
            if (listaLOGIN[0] !== undefined) {
                if (listaLOGIN[0].indexOf('|') > -1 || listaLOGIN[0].indexOf(':') > -1) {
                    splittarDATA = true;
                }
            }
        }
        else
            console.log('ERRO AO carregar arquivo Lista com SENHA....', listaLOGIN);
    }
    else
        listaLOGIN = false;
    let listaDATA;
    if (fLISTANORMAL !== undefined && fLISTANORMAL !== '') {
        listaDATA = await ReadWrite_file.read_file(dirPath + fLISTANORMAL);
        if (listaDATA !== false) {
            listaDATA = await listaDATA.split(/\r?\n/);
        }
    }
    else
        listaDATA = false;
    return [true, listJAFOI, listaDATA, splittarDATA, listaLOGIN];
}
exports.static_LOADFILES = static_LOADFILES;
async function Jafoi(str, PathFile) {
    await WriteFile_file.write_file(PathFile, await str + '\n');
}
exports.Jafoi = Jafoi;
async function SearchTextInFileA(TxtSearch, File) {
    var e_1, _a;
    const fileStream = fs_1.default.createReadStream(File);
    const rl = readline_1.default.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    try {
        for (var rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = await rl_1.next(), !rl_1_1.done;) {
            const line = rl_1_1.value;
            if (line.indexOf(TxtSearch) > -1 || line.includes(TxtSearch)) {
                return true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (rl_1_1 && !rl_1_1.done && (_a = rl_1.return)) await _a.call(rl_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return false;
}
exports.SearchTextInFileA = SearchTextInFileA;
async function SearchTextInFile(TxtSearch, File) {
    return new Promise(async (resolve) => {
        let RD = await ReadWrite_file.read_file(File);
        if (RD === false || RD === '') {
            resolve(false);
            return;
        }
        line_reader_1.default.eachLine(File, async function (line, last) {
            if (line.indexOf(TxtSearch) > -1) {
                resolve(true);
                return false;
            }
            if (await last === true)
                resolve(false);
        });
    })
        .catch(e => {
        return false;
    });
}
exports.SearchTextInFile = SearchTextInFile;
let ArCOOKIE = {};
async function get_COOKIE(Header) {
    try {
        await Header['set-cookie'].forEach(async (e) => {
            let C = await e.substring(0, e.indexOf('; ') + 2);
            let A = await C.split('=');
            ArCOOKIE[A[0]] = A[1];
        });
    }
    catch (e) { }
}
async function att_Cooie(Header, _gid_ga = '') {
    let iCOOKIE = '';
    iCOOKIE += _gid_ga;
    await get_COOKIE(Header);
    try {
        Object.entries(ArCOOKIE).forEach(([key, value], index) => {
            iCOOKIE += key + '=' + value;
        });
    }
    catch (e) { }
    return iCOOKIE;
}
const convertToUTF8 = (body, fromEncoding = 'iso-8859-1') => {
    var iconv = require('iconv');
    const ic = new iconv.Iconv(fromEncoding, 'utf-8');
    const buf = ic.convert(body);
    return buf.toString('utf-8');
};
exports.convertToUTF8 = convertToUTF8;
