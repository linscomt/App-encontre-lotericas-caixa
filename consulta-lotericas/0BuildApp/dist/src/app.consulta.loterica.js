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
exports.ConsultarLT = void 0;
require("dotenv/config");
const Funcoes = __importStar(require("../modulos/appMod/f.to.app"));
const writefile_1 = require("../modulos/appMod/writefile");
const readfile_1 = require("../modulos/appMod/readfile");
const looger_out_1 = __importDefault(require("../modulos/appMod/looger.out"));
const looger = new looger_out_1.default('App start Busca Loterica', '0');
const FPuppeteer = __importStar(require("../modulos/appPU/f.puppeteer"));
const urls_json_1 = __importDefault(require("../urls.json"));
const app_const_1 = require("./app.const");
async function LaodingPG(page) {
    let CLoop = 5;
    while (true) {
        let RWLoop = await FPuppeteer.WAITLoopB(page, ['div[id="loading"][style="display: block;"]'], 1);
        if (RWLoop.result == false) {
            return true;
        }
        if (CLoop <= 0)
            break;
        else
            ;
        CLoop--;
        await Funcoes.wsleep(1000);
    }
    await looger.consoleEINFO('LOADING.......');
    return false;
}
async function AP_CriarPU(PU, FPuppeteer, DATAPROXY, AgentUSER) {
    PU = await FPuppeteer.CriarPUU(PU, DATAPROXY, AgentUSER);
    if (await PU === false || await PU === undefined) {
        await looger.consoleINFO('ERROR AO CRIAR APP....', await PU);
        return {};
    }
    else {
        await looger.consoleINFO('APP CRIADO....');
        return PU;
    }
}
async function AP_setURL(PU, FPuppeteer, URL) {
    return await FPuppeteer.GotoPagina(PU.page, URL, 60000);
}
async function LTcx_SelectLOTERICA(page) {
    let selectOptionLT = 'div[class="form form-d form-vertical"] div[class="select-button"] select[name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$ddlTipo"][id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_ddlTipo"]';
    try {
        await page.select(selectOptionLT, '2');
        await looger.consoleEINFO('SELECIONOU LOTERICA');
        return true;
    }
    catch (e) { }
    return false;
}
async function LTcx_SelectESTADO(page, ESt, sName = '') {
    let selectOptionES = 'div[class="form form-d form-vertical"] div[class="select-button"] select[name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$ddlUf"][id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_ddlUf"]';
    try {
        let CLoop1 = 0;
        while (true) {
            await FPuppeteer.OptionSelect(page, selectOptionES, ESt, sName);
            await Funcoes.wsleep(1);
            let CLoop = 0;
            while (true) {
                let RWLoop = LaodingPG(page);
                if (await !RWLoop == false) {
                    await looger.consoleEINFO('SELECIONOU ESTADO', 'sUF');
                    return true;
                }
                if (CLoop > 3) {
                    break;
                }
                else
                    CLoop++;
            }
            if (CLoop1 > 1) {
                return false;
            }
            else
                CLoop1++;
        }
    }
    catch (e) { }
    return false;
}
async function LTcx_GetListaCidades(page) {
    let selectOptionCD = 'div[class="form form-d form-vertical"] div[class="select-button"] select[name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$ddlCidade"][id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_ddlCidade"]';
    let CLoop = 0;
    let Listas = [];
    let L;
    let RWLoop = LaodingPG(page);
    await FPuppeteer.WAITLoopB(page, [selectOptionCD]);
    while (true) {
        L = await FPuppeteer.GetSrcObjHtml(page, selectOptionCD);
        if (L === '<option selected="selected" value="">Cidade</option>') {
            await looger.consoleEINFO('SEM LISTA CIDADES');
        }
        else {
            await looger.consoleEINFO('LISTA de CIDADES');
            break;
        }
        if (CLoop > 2) {
            return [];
        }
        else {
            CLoop++;
            await Funcoes.wsleep(1000);
        }
    }
    try {
        if (L.includes('<option value="')) {
            L = L.split('<option value="');
            await L.forEach(element => {
                if (element != '' && !element.includes('Cidade')) {
                    let s1 = element.substring(0, element.indexOf('">'));
                    let s2 = element.substring(element.indexOf('">') + 2, element.indexOf('</'));
                    Listas[s1] = ({ value: s1, cidade: s2 });
                }
            });
        }
    }
    catch (error) { }
    return Listas;
}
async function LTcx_SelectCIDADE(page, Value, Cidade) {
    let selectOptionCD = 'div[class="form form-d form-vertical"] div[class="select-button"] select[name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$ddlCidade"][id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_ddlCidade"]';
    return await FPuppeteer.OptionSelect(page, selectOptionCD, Value, Cidade);
}
async function LTcx_BuscaCDLotericas(page) {
    let btBuscar = 'input[name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$btnBuscar"][value="Buscar"][id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_btnBuscar"]';
    await FPuppeteer.Click(page, btBuscar);
    return true;
}
async function LTcx_BuscaLotericas(page) {
    let btBuscar = '';
    btBuscar = "#ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_btnBuscar";
    await FPuppeteer.MouseMoveClick(page, btBuscar);
    await FPuppeteer.ClickB(page, btBuscar);
    if (await FPuppeteer.Click(page, btBuscar) === true) {
        await looger.consoleINFO('OK BUSCAR 2');
        return true;
    }
    return false;
}
async function LTcx_VerMaisLotericas(page) {
    let lenHTML1 = await FPuppeteer.getLenHtml(page);
    let btVerMais = 'div[id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_pnlVerMais"][class="resultado-busca-item ver-mais"] input[type="submit"][name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$btnVerMais"][value="Ver mais"][id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_btnVerMais"][class="btn blue-text btn-small non-fluid index-link"]';
    if (await FPuppeteer.Click(page, btVerMais) == true) {
        let lenHTML2 = await FPuppeteer.getLenHtml(page);
        if (lenHTML1 !== lenHTML2)
            return true;
        else
            ;
        return false;
    }
    else
        return false;
}
async function LTcx_ListarLotericas(page) {
    let RWLoop = LaodingPG(page);
    let CLoop = 0;
    while (true) {
        let RR = await FPuppeteer.WAITLoopB(page, ['ul[class="no-bullets founded"]'], 1);
        if (RR.result == true)
            break;
        await Funcoes.wsleep(1000);
        if (CLoop > 0) {
            break;
        }
        else
            CLoop++;
    }
    let Listas = [];
    try {
        let L = await FPuppeteer.GetSrcObjHtml(page, 'ul[class="no-bullets founded"]');
        if (L.includes('<div class="resultado-busca-item">')) {
            Listas = L.split('<li class="indice-letter-group">');
        }
        await looger.consoleINFO_OK('LTcx_ListarLotericas -OK');
    }
    catch (e) { }
    return Listas;
}
async function LTcx_SalvarLista(L, E, C) {
    return new Promise(async (resolve) => {
        console.log('--IN-LTcx_SalvarLista-----');
        for (let index = 0; index < L.length; index++) {
            const element = L[index];
            if (element != '')
                await LTcx_SalvarLotericas(element, E, C);
        }
        console.log('--OUT-LTcx_SalvarLista-----');
        resolve(true);
    });
}
async function LTcx_SalvarLotericas(data, E, C) {
    data = data.replace(/<br>                                        /g, "\n");
    if (data === '')
        return false;
    let Title = await Funcoes.getstrValue(data, '<h4 class="resultado-busca-titulo">', '</h4>');
    let Endereco = await Funcoes.getstrValue(data, '<p style="text-transform: none;">', '</p>');
    let RazaoSocial = await Funcoes.getstrValue(data, '<b>Razão Social:</b>', '</p>');
    async function limpar(dt) {
        dt = await dt.replace(/<b>/g, "");
        dt = await dt.replace(/<\/b>/g, "");
        dt = await dt.replace(/<br>/g, "");
        return await dt;
    }
    let FMT = 'Cidade:' + C + "\n" +
        await limpar(Title.message.trim()) + "\n" +
        await limpar(Endereco.message.trim()) + "\n" +
        'RzS:' +
        await limpar(RazaoSocial.message.trim());
    await (0, writefile_1.write_file)(app_const_1.OutListaF1 + E + '.txt', FMT + "\n---------------------------------------------------$\n");
    FMT = FMT.replace(/\n/g, '|');
    await (0, writefile_1.write_file)(app_const_1.OutListaF2 + E + '.txt', FMT + "\n");
    console.log('LTcx_SalvarLotericas:', E, C, Title.message.trim());
    return true;
}
async function NenhumPonto(page) {
    let resultado_busca = 'div[id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_upPrincipal"] h4[class="resultado-busca-titulo"]';
    let R = await FPuppeteer.GetTextObjHTML(page, resultado_busca);
    if (R !== false) {
        if (R.includes('Nenhum ponto de atendimento foi localizado com os dados informados.'))
            return true;
    }
    console.log('GET-NenhumPonto', R);
    return R;
}
async function ConsultarLT(ESt, iPs) {
    return new Promise(async (resolve) => {
        let V_C = await (0, readfile_1.read_file)(app_const_1.TEmpMemCD + ESt + '.log');
        if (V_C == false)
            V_C = '0';
        await (0, writefile_1.write_fileA)(app_const_1.TEmpMemCD + ESt + '.log', '0');
        let s_message = 'ConsultarLT_START';
        let AgentUSER = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36';
        let PU = {};
        let DATAPROXY = {};
        let ListaF = false;
        PU = await AP_CriarPU(PU, FPuppeteer, DATAPROXY, AgentUSER);
        let CPG = 0;
        while (true) {
            if (await AP_setURL(PU, FPuppeteer, urls_json_1.default.paginaBuscaLotericas) !== false) {
                break;
            }
            if (CPG > 10) {
                resolve({ result: false, ESt, iPs, s_message: '#NAOCARREGOU#' });
                return;
            }
            CPG++;
            await looger.consoleEINFO('NAO CARREGOU', CPG);
            await Funcoes.wsleep(1000);
        }
        await LTcx_SelectLOTERICA(PU.page);
        if (await LTcx_SelectESTADO(PU.page, ESt)) {
            let ListaCD = await LTcx_GetListaCidades(PU.page);
            let OLDLocal = '';
            for (let index = 0; index < ListaCD.length; index++) {
                const element = ListaCD[index];
                if (element !== undefined && parseInt(element.value) > parseInt(V_C[0])) {
                    let CLoopLD1 = 10;
                    while (true) {
                        if (await LaodingPG(PU.page) == true)
                            break;
                        if (CLoopLD1 <= 0) {
                            break;
                        }
                        else
                            CLoopLD1--;
                    }
                    if (CLoopLD1 <= 0) {
                        await (0, writefile_1.write_fileA)(app_const_1.TEmpMemCD + ESt + '.log', element.value);
                        ConsultarLT(ESt, iPs);
                        resolve({ result: false, ESt, iPs, s_message: 'LOADING...' });
                        return;
                    }
                    await LTcx_SelectCIDADE(PU.page, element.value, element.cidade);
                    let ListaLT = [];
                    while (true) {
                        await LTcx_BuscaLotericas(PU.page);
                        ListaLT = await LTcx_ListarLotericas(PU.page);
                        if (ListaLT.length > 0)
                            break;
                        await looger.consoleINFO('NO LISTA', element.value);
                        if (await NenhumPonto(PU.page) === true)
                            break;
                        await Funcoes.wsleep(1000);
                    }
                    if (ListaLT.length > 0) {
                        while (true) {
                            if (await LTcx_VerMaisLotericas(PU.page) == true) {
                                await looger.consoleEINFO('OK-BT-VERMAIS');
                            }
                            else {
                                await looger.consoleEINFO('NO-BT-VERMAIS');
                                break;
                            }
                        }
                        ListaLT = await LTcx_ListarLotericas(PU.page);
                        await LTcx_SalvarLista(ListaLT, ESt, element.cidade);
                    }
                }
            }
            resolve({ result: true, ESt, iPs, s_message });
            await (0, writefile_1.write_file)(app_const_1.FL_PsJAFOI, iPs + "\n");
            await (0, writefile_1.write_file)(app_const_1.FL_JAFOI, ESt + "\n");
        }
        else
            resolve({ result: false, ESt, iPs, s_message: 'SELeCTESTADOERRO' });
        await looger.consoleINFO_OK('FIM-DA-Consulta-LT', ESt, iPs);
        await FPuppeteer.Destroi(PU);
    });
}
exports.ConsultarLT = ConsultarLT;
