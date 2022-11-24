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
const DateZone = __importStar(require("../appMod/DateZoneFunc"));
const ANSI_RESET = "\u001B[0m";
const ANSI_BLACK = "\u001B[30m";
const ANSI_RED = "\u001B[31m";
const ANSI_GREEN = "\u001B[32m";
const ANSI_YELLOW = "\u001B[33m";
const ANSI_BLUE = "\u001B[34m";
const ANSI_PURPLE = "\u001B[35m";
const ANSI_CYAN = "\u001B[36m";
const ANSI_WHITE = "\u001B[37m";
const ANSI_00038_ = "\u001B[38m";
const ANSI_00039_ = "\u001B[39m";
const ANSI_00040_ = "\u001B[40m";
class Logger {
    constructor(name, ciduser) {
        this.name = name;
        this.ciduser = ciduser;
        this.luserid = '' + this.ciduser;
    }
    async logger_out(line) {
        await DateZone.get_datezone(0, false).then(result => {
            if (process.env.CONSOLESHOW == "true")
                console.log(result, `[${this.luserid}][${this.name}] ${line}`);
        });
    }
    async consoleINFO(str, ...texto) {
        await DateZone.dateFMT().then(result => {
            console.log(ANSI_PURPLE, result, `${ANSI_GREEN}[${this.luserid}]`, `${ANSI_CYAN}[${this.name}]`, `${ANSI_YELLOW}`, str, ANSI_WHITE, texto, ANSI_WHITE);
        });
    }
    async consoleLog(str, ...texto) {
        if (process.env.CONSOLESHOW === "true")
            await DateZone.dateFMT().then(result => {
                console.log(ANSI_PURPLE, result, `${ANSI_GREEN}[${this.luserid}]`, `${ANSI_CYAN}[${this.name}]`, `${ANSI_YELLOW}`, str, ANSI_WHITE, texto, ANSI_WHITE);
            });
    }
    async consoleEINFO(str, ...texto) {
        await DateZone.dateFMT().then(result => {
            console.error(ANSI_PURPLE, result, `${ANSI_GREEN}[${this.luserid}]`, `${ANSI_CYAN}[${this.name}]`, `${ANSI_RED}`, str, ANSI_WHITE, texto, ANSI_WHITE);
        });
    }
    async console_log(str, str2 = '', str3 = '', str4 = '', str5 = '', str6 = '', str7 = '', str8 = '', str9 = '', str10 = '', str11 = '', str12 = '', str13 = '', str14 = '', str15 = '', str16 = '', str17 = '', str18 = '', str19 = '', str20 = '', str21 = '') {
        if (process.env.CONSOLESHOW == "true")
            await DateZone.get_datezone(0, false).then(result => {
                try {
                    console.log(result, ` ${ANSI_GREEN}${this.luserid}`, ` ${ANSI_CYAN}[${this.name}]`, ` ${ANSI_YELLOW}`, str, (str2 != '') ? ` ${ANSI_YELLOW}` : '', str2, (str3 != '') ? ` ${ANSI_PURPLE}` : '', str3, (str4 != '') ? ` ${ANSI_BLUE}` : '', str4, (str5 != '') ? ` ${ANSI_WHITE}` : '', str5, (str6 != '') ? ` ${ANSI_GREEN}` : '', str6, (str7 != '') ? ` ${ANSI_CYAN}` : '', str7, (str8 != '') ? ` ${ANSI_YELLOW}` : '', str8, (str9 != '') ? ` ${ANSI_YELLOW}` : '', str9, (str10 != '') ? ` ${ANSI_YELLOW}` : '', str10, (str11 != '') ? ` ${ANSI_YELLOW}` : '', str11, (str12 != '') ? ` ${ANSI_YELLOW}` : '', str12, (str13 != '') ? ` ${ANSI_YELLOW}` : '', str13, (str14 != '') ? ` ${ANSI_YELLOW}` : '', str14, (str15 != '') ? ` ${ANSI_YELLOW}` : '', str15, (str16 != '') ? ` ${ANSI_YELLOW}` : '', str16, (str17 != '') ? ` ${ANSI_YELLOW}` : '', str17, (str18 != '') ? ` ${ANSI_YELLOW}` : '', str18, (str19 != '') ? ` ${ANSI_YELLOW}` : '', str19, (str20 != '') ? ` ${ANSI_YELLOW}` : '', str20, (str21 != '') ? ` ${ANSI_YELLOW}` : '', str21, ANSI_WHITE);
                }
                catch (error) {
                    try {
                        console.log(`${ANSI_GREEN}${this.luserid}`, `${ANSI_BLUE}[${this.name}]`, ANSI_RED, 'ERROR=', error.message);
                    }
                    catch (error) {
                        console.log(`${ANSI_GREEN}${this.luserid}`, `${ANSI_BLUE}[${this.name}]`, ANSI_RED, 'ERROR=', error);
                    }
                }
            });
    }
    async error(line, exception = null) {
        if (process.env.SHOW_ERRORS == "true") {
            await DateZone.get_datezone(0, false).then(async (result) => {
                console.error(result, `[${this.name}]`, ANSI_RED, line);
            });
            if (exception) {
                console.error(ANSI_RED, exception);
            }
            console.log(`${ANSI_WHITE}`);
        }
    }
}
exports.default = Logger;
