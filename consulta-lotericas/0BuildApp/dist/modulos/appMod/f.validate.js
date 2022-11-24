"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checar_dados = void 0;
const looger_out_1 = __importDefault(require("./looger.out"));
var logger = new looger_out_1.default('F Validate', process.pid.toString());
async function checar_dados(Data, Testar, Delimitador = '|') {
    let ALL;
    if (Testar === 'CPF') {
        logger.consoleLog('TESTANDO CPF');
    }
    else if (Testar === 'NIS') {
        logger.consoleLog('TESTANDO NIS');
    }
    else if (Testar === 'BNF') {
        ALL = Data.split(Delimitador);
        let CPF = ALL[0];
        let BENEF = ALL[1];
        let NOME = ALL[2];
        let DTNASC = ALL[3];
        return { result: true, CPF, BENEF, NOME, DTNASC };
    }
    else
        return { result: false };
}
exports.checar_dados = checar_dados;
