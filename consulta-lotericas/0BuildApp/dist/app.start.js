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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UEST = exports.iPosicao = exports.MxTh = exports.TempCheck = void 0;
require("dotenv/config");
const Funcoes = __importStar(require("./modulos/appMod/f.to.app"));
const readfile_1 = require("./modulos/appMod/readfile");
const looger_out_1 = __importDefault(require("./modulos/appMod/looger.out"));
const looger = new looger_out_1.default('App start Busca Loterica', '0');
const app_consulta_loterica_1 = require("./src/app.consulta.loterica");
const app_const_1 = require("./src/app.const");
const urls_json_1 = __importDefault(require("./urls.json"));
exports.TempCheck = [];
exports.MxTh = 0;
exports.iPosicao = 0;
(async () => {
    await looger.consoleLog(`APP[IN-START]: ${process.memoryUsage().rss / 1024 / 1024} MiB`);
    let FLPsJAFOI = await (0, readfile_1.read_file)(app_const_1.FL_PsJAFOI);
    if (FLPsJAFOI != false && FLPsJAFOI != '') {
        exports.iPosicao = parseInt(FLPsJAFOI);
    }
    let JAFOIEST = await (0, readfile_1.read_file)(app_const_1.FL_JAFOI);
    if (JAFOIEST == false)
        JAFOIEST = '';
    const MAXESTADOS = (urls_json_1.default.Estados.length - 1);
    async function status() {
        await looger.consoleLog('STATUS', exports.UEST, urls_json_1.default.Estados[exports.iPosicao], 'TH:', exports.TempCheck.length, 'POS:', exports.iPosicao, 'MAXTH:', app_const_1.MAXTH);
    }
    function set_check(iPs) {
        if (urls_json_1.default.Estados[iPs] !== undefined) {
            exports.UEST = urls_json_1.default.Estados[iPs];
            if (JAFOIEST.includes(exports.UEST)) {
            }
            else {
                looger.consoleLog('TESTANDO ESTADO:', exports.UEST);
                exports.TempCheck.push((0, app_consulta_loterica_1.ConsultarLT)(urls_json_1.default.Estados[iPs], iPs));
            }
            exports.iPosicao++;
        }
    }
    async function rem_check() {
        if (exports.TempCheck.length > 0) {
            exports.TempCheck.forEach((element, i) => {
                element.then(async (e) => {
                    if (e.result === true) {
                        exports.TempCheck.splice(i, 1);
                    }
                    else if (e.result === false) {
                        exports.TempCheck.splice(i, 1);
                        set_check(e.iPs);
                    }
                });
            });
        }
    }
    while (true) {
        if (exports.TempCheck.length < app_const_1.MAXTH && exports.iPosicao <= MAXESTADOS) {
            set_check(exports.iPosicao);
        }
        else
            await Funcoes.wsleep(1000);
        rem_check();
        if (exports.iPosicao > MAXESTADOS && exports.TempCheck.length == 0) {
            await looger.consoleLog('FIM DA LISTA DE ESTADOS');
            break;
        }
        await Funcoes.wsleep(1);
    }
})();
