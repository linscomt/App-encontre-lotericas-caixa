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
exports.iNjectCookie = exports.fmtCookie = exports.getOption = exports.getAllCookie = exports.WAITVisible = exports.getiFrame = exports.load_iFrame = exports.setValueInputB = exports.setValueInputA = exports.GetValueObjInput = exports.GetTextObjHTML = exports.XPath_Click = exports.Click = exports.MouseMoveClick = exports.WAITLoopB = exports.Events_ONCE = exports.Events_ON = exports.SelectValue = exports.SelectSearchValue = exports.getObjCodeHtml = exports.CLEAR_input = exports.executeJavaScript = exports.Destroi = exports.WaitLoadForSelector = exports.GotoPagina = exports.GotoContents = exports.CriarPUU = void 0;
require("dotenv/config");
const os_1 = __importDefault(require("os"));
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const looger_out_1 = __importDefault(require("../appMod/looger.out"));
const looger = new looger_out_1.default('Puppeteer', 'TS');
const writefile_1 = require("../appMod/writefile");
const UserAgent_to_app_1 = require("../appMod/UserAgent.to.app");
const AppFunc = __importStar(require("../appMod/f.to.app"));
const cheerio = __importStar(require("cheerio"));
const MOVEJN = (process.env.MOVERJANELA !== '' ? process.env.MOVERJANELA : '0');
const MOVETOPJN = (process.env.MOVERJANELATOP !== '' ? process.env.MOVERJANELATOP : '0');
const TAMANHOJNW = (process.env.TMWJANELA !== undefined && process.env.TMWJANELA !== '' ? process.env.TMWJANELA : '1024');
const TAMANHOJNH = (process.env.TMHJANELA !== undefined && process.env.TMHJANELA !== '' ? process.env.TMHJANELA : '720');
const SHOWHIDEJANELA = (process.env.SHOWHIDEJANELA !== undefined && process.env.SHOWHIDEJANELA === 'true' ? false : true);
const SHOWDUMPIO = (process.env.SHOWDUMPIO !== undefined && process.env.SHOWDUMPIO === 'true' ? true : false);
async function CriarPUU(PU, DATAPROXY, AgentUSER) {
    if (PU.page !== undefined) {
        await Destroi(PU);
    }
    var outPU = {};
    async function CriarPU() {
        let cPULC = await Create(DATAPROXY.URLPROXIE, (DATAPROXY.URLPWD !== undefined && DATAPROXY.URLPWD !== '' ? DATAPROXY.URLPWD : DATAPROXY.URLPWD));
        if (cPULC !== undefined && cPULC.page !== undefined) {
            looger.consoleLog('CONFIGURAR  APP.............');
            await Configurar(cPULC.page, AgentUSER);
            return cPULC;
        }
        looger.consoleLog('ERRO AO CRIAR APP.............', await cPULC);
        return false;
    }
    looger.consoleLog('CRIAR APP.............');
    outPU = await CriarPU();
    if (outPU === false || outPU.page === undefined) {
        looger.consoleEINFO('ERRO ao CRIAR APP.............');
        process.exit();
    }
    return outPU;
}
exports.CriarPUU = CriarPUU;
async function Create(URLProxy_PORT, ProxyPWD, define = '') {
    looger.consoleLog('PROXy', { PROXY_PORT: URLProxy_PORT, PROXY_PWD: ProxyPWD });
    const LOCALBROWSERso = {
        'linux': '/snap/bin/chromium',
        'centos': '/usr/bin/chromium-browser',
        'windows': 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    };
    let start_proxyes = (URLProxy_PORT != '' && URLProxy_PORT !== false && URLProxy_PORT !== undefined && URLProxy_PORT !== null) ? true : false;
    if (start_proxyes === true) {
        if (URLProxy_PORT.includes('@') && (ProxyPWD === '' || ProxyPWD === undefined)) {
            let P = URLProxy_PORT.split('@');
            URLProxy_PORT = 'http://' + P[1];
            ProxyPWD = P[0];
        }
    }
    else
        ProxyPWD = '';
    await looger.consoleLog({ URLProxy_PORT });
    let LCBROWSER = '';
    if (os_1.default.version().includes('Windows'))
        LCBROWSER = LOCALBROWSERso['windows'];
    else
        LCBROWSER = LOCALBROWSERso['linux'];
    let i = 0;
    try {
        return await puppeteer_extra_1.default
            .use((0, puppeteer_extra_plugin_stealth_1.default)())
            .launch({
            dumpio: SHOWDUMPIO,
            headless: SHOWHIDEJANELA,
            ignoreDefaultArgs: ["--disable-extensions"],
            ignoreHTTPSErrors: true,
            devtools: false,
            executablePath: LCBROWSER,
            args: [
                (start_proxyes === true) ? '--proxy-server=' + URLProxy_PORT : '',
                '--window-size=' + TAMANHOJNW + ',' + TAMANHOJNH,
                '--window-position=' + MOVEJN + ',' + MOVETOPJN,
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process',
                "--disable-gpu",
                '--disable-dev-shm-usage',
                '--no-first-run',
                '--no-zygote',
                (SHOWHIDEJANELA === false ? '' : '--single-process'),
                '--use-gl=egl',
            ],
        })
            .then(async (browser) => {
            const page = await browser.newPage();
            if (start_proxyes && ProxyPWD != '') {
                if (ProxyPWD.includes('http')) {
                    ProxyPWD = ProxyPWD.substring(ProxyPWD.indexOf('//') + 2);
                }
                ProxyPWD = ProxyPWD.split(':');
                console.log({ ProxyPWD });
                await page.authenticate({ username: ProxyPWD[0], password: ProxyPWD[1] });
            }
            await page.setViewport({ width: parseInt(TAMANHOJNW), height: parseInt(TAMANHOJNH) });
            return { 'page': page, 'browser': browser, 'Puppeteer': puppeteer_extra_1.default };
        });
    }
    catch (e) {
        console.log('ERROR#Create:', e);
    }
}
async function Configurar(page, USerAgent = '') {
    try {
        await page.setDefaultNavigationTimeout(120000);
        await page.setUserAgent((USerAgent !== '' ? USerAgent : (0, UserAgent_to_app_1.get_newAgent)(8)));
    }
    catch (e) {
        console.log('ERRO-CFG-PU', e);
    }
}
async function setWindowSize(page, width, height) {
    if (page) {
        const session = await page.target().createCDPSession();
        const { windowId } = await session.send('Browser.getWindowForTarget');
        await session.send('Browser.setWindowBounds', { windowId, bounds: { width: width, height: height } });
        await session.detach();
    }
    else {
        await page.setViewport({ width: width, height: height });
    }
}
async function GotoContents(Pagina) {
    console.log(Pagina.browserContexts().length);
    var x = await Pagina.targets();
    for (let i = 0; i < x.length; i++) {
        if (x[i].type() === 'browser') {
            console.log(x[i]['_targetInfo']['targetId']);
        }
    }
}
exports.GotoContents = GotoContents;
async function GotoPagina(page, URLURI, timeout = 240000) {
    try {
        let response = await page.goto(URLURI, { waitUntil: 'load', 'timeout': timeout });
        try {
            console.log(await response);
        }
        catch (e) {
            console.log('ERRO-GOTO:', e);
        }
        return response;
    }
    catch (error) {
        console.log('ERROR-GOTO-PAGINA:', error);
        return false;
    }
}
exports.GotoPagina = GotoPagina;
async function ScreenShot(page, namefile) {
    await page.screenshot({ path: 'ScreenShot_' + namefile + '.png', fullPage: true });
}
async function WaitLoadEnd(page, objQueryName, timeOut = 30000) {
    let OBJRESULT = await page.waitForSelector(objQueryName, { timeout: timeOut });
    return OBJRESULT;
}
async function WaitLoadForSelector(page, objQueryName, timeOut = 30000) {
    try {
        let OBJRESULT = await page.waitForSelector(objQueryName, { timeout: timeOut });
        return { 'result': true, 'Obj': OBJRESULT };
    }
    catch (e) {
        return { 'result': false, 'Obj': undefined };
    }
}
exports.WaitLoadForSelector = WaitLoadForSelector;
async function AguardaLOADFULL(page) {
    await page.waitForNavigation({ waitUntil: "domcontentloaded" });
}
async function Destroi(P) {
    try {
        await DestroiP(P.page);
        await P.browser.close();
        P.browser = undefined;
        P.page = undefined;
    }
    catch (e) { }
}
exports.Destroi = Destroi;
async function DestroiP(page) {
    await page.close();
}
async function executeJavaScript(page, CodeJS) {
    try {
        let R = await page.evaluate(CodeJS);
        await looger.consoleINFO('EXEC-JS:', await R);
        return await R;
    }
    catch (e) {
        await looger.consoleINFO('ERROR#FUNCTION-executeJavaScript:', e);
        return false;
    }
}
exports.executeJavaScript = executeJavaScript;
async function CLEAR_input(page, selector) {
    try {
        await page.evaluate(() => document.querySelector(selector).value = "");
    }
    catch (e) {
        try {
            const input = await page.$(selector);
            await input.click({ clickCount: 3 });
            await page.keyboard.press('Backspace');
        }
        catch (e) {
            try {
                const inputValue = await page.$eval(selector, el => el.value);
                for (let i = 0; i < inputValue.length; i++) {
                    await page.keyboard.press('Backspace');
                }
            }
            catch (e) {
                try {
                    const input = await page.$(selector);
                    await input.click({ clickCount: 3 });
                }
                catch (e) {
                    try {
                        await page.$eval(selector, el => el.value = '');
                    }
                    catch (e) { }
                }
            }
        }
    }
}
exports.CLEAR_input = CLEAR_input;
async function get_codeHtml(lpage) {
    try {
        let html = await lpage.content();
        let $ = await cheerio.load(html);
        let hBody = await $('body').text();
        return await hBody;
    }
    catch (e) {
        return false;
    }
}
async function getObjCodeHtml(page, tag = 'html') {
    try {
        let html = await page.content();
        let $ = await cheerio.load(html);
        return await $(tag);
    }
    catch (e) {
        return false;
    }
}
exports.getObjCodeHtml = getObjCodeHtml;
async function SelectSearchValue(page, Valor) {
    try {
        return await page.$$eval('option', options => { var _a; (_a = options.find(o => o.innerText === Valor)) === null || _a === void 0 ? void 0 : _a.value; });
    }
    catch (e) {
        return false;
    }
}
exports.SelectSearchValue = SelectSearchValue;
async function SelectValue(page, Selector, optionValue) {
    try {
        return await page.select(Selector, optionValue);
    }
    catch (e) {
        return false;
    }
}
exports.SelectValue = SelectValue;
async function Events_ON(page, onEvent, oFunction) {
    page.on(onEvent, async (res) => {
        oFunction(res);
    });
}
exports.Events_ON = Events_ON;
async function Events_ONCE(page, onceEvent, oFunction) {
    page.on(onceEvent, async (request) => {
        oFunction(request);
    });
}
exports.Events_ONCE = Events_ONCE;
async function EventsPxONCE(page, mClass, onceEvent, oFunction) {
    page.once(onceEvent, async (request) => {
        oFunction(request, mClass);
    });
}
async function WaitAllIMG(page) {
    await page.evaluate(async () => {
        const selectors = Array.from(document.querySelectorAll("img"));
        await Promise.all(selectors.map(img => {
            if (img.complete)
                return;
            return new Promise((resolve, reject) => {
                img.addEventListener('load', resolve);
                img.addEventListener('error', reject);
            });
        }));
    });
}
async function WaitLoadPage(page) {
    return page.waitForNavigation({ waitUntil: 'domcontentloaded' });
}
async function WaitLoad200(page) {
    return await page.waitForResponse(response => response.status() === 200);
}
async function WAITLoop(page, element, MAXtime = 5) {
    while (true) {
        try {
            await page.waitForSelector(element, { timeout: 100 });
            return true;
        }
        catch (error) { }
        await AppFunc.wsleep(900);
        MAXtime--;
        if (MAXtime <= 0) {
            return false;
        }
        console.log('WAITLOOP', MAXtime);
    }
}
async function WAITLoopB(page, ObjAR, TimeMAX = 5) {
    try {
        const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));
        while (true) {
            await sleep(990);
            for (let index = 0; index < ObjAR.length; index++) {
                const element = ObjAR[index];
                try {
                    let SL = await page.waitForSelector(element, { timeout: 10 });
                    return { result: true, posElement: index, NmElement: element, Obj: SL };
                }
                catch (error) { }
            }
            TimeMAX--;
            if (TimeMAX <= 0) {
                return { result: false, posElement: -1, NmElement: '', Obj: undefined };
            }
            process.stdout.write('WAITLOOP_B, ' + TimeMAX + "\r");
        }
    }
    catch (e) {
        return { result: false, posElement: -1, NmElement: '', Obj: undefined };
    }
}
exports.WAITLoopB = WAITLoopB;
async function getBoundingOBJ(page, Selector) {
    try {
        return await page.evaluate((selector) => {
            return document.querySelector(selector).getBoundingClientRect();
        }, Selector);
    }
    catch (e) {
        return false;
    }
}
async function MouseMoveClick(page, Selector) {
    try {
        let Bxy = await getBoundingOBJ(page, Selector);
        if (Bxy !== false && Bxy !== undefined) {
            await page.mouse.move(Bxy.x, Bxy.y);
            await page.mouse.down();
            await page.waitForTimeout(250);
            await page.mouse.up();
        }
    }
    catch (e) { }
}
exports.MouseMoveClick = MouseMoveClick;
async function Click(page, element) {
    try {
        await page.click(element);
        await page.waitForTimeout(1000);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.Click = Click;
async function XPath_Click(page, element) {
    const elements_input1 = await page.$x(element);
    for (let index = 0; index < elements_input1.length; index++) {
        const element = elements_input1[index];
        try {
            await element.click();
            return true;
        }
        catch (e) { }
    }
    return false;
}
exports.XPath_Click = XPath_Click;
async function GetTextObjHTML(page, selector) {
    try {
        return await page.evaluate((selector) => {
            return document.querySelector(selector).textContent.replace(/\t/g, '').replace(/\n/g, '').trim();
        }, selector);
    }
    catch (e) {
        return false;
    }
}
exports.GetTextObjHTML = GetTextObjHTML;
async function GetValueObjInput(page, selector) {
    try {
        return await page.evaluate((selector) => {
            return document.querySelector(selector).value.replace(/\t/g, '').replace(/\n/g, '').trim();
        }, selector);
    }
    catch (e) {
        return false;
    }
}
exports.GetValueObjInput = GetValueObjInput;
async function setValueInputA(page, selector, value) {
    try {
        await page.focus(selector);
        await page.keyboard.type(value);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.setValueInputA = setValueInputA;
async function setValueInputB(page, selector, value) {
    await page.waitFor(selector);
    await page.evaluate((data) => {
        try {
            document.querySelector(data.selector).select();
        }
        catch (_a) { }
        return document.querySelector(data.selector).value = data.value;
    }, { selector, value });
}
exports.setValueInputB = setValueInputB;
async function loadiFrame(page, Selector, textIN, MAXLOOPWhile1) {
    var elementHandle;
    var iframe;
    while (true) {
        try {
            elementHandle = await page.$(Selector);
            if (elementHandle) {
                iframe = await elementHandle.contentFrame();
                console.log(' ... BODY IFRAME OK');
                break;
            }
        }
        catch (e) { }
        MAXLOOPWhile1--;
        if (MAXLOOPWhile1 <= 0) {
            console.log(' ... BODY IFRAME NO');
            iframe = false;
            break;
        }
    }
    return iframe;
}
async function load_iFrame(page, Selector = '', MAXLOOPWhile1 = 1) {
    var elementHandle;
    var iframe;
    Selector = (Selector === '' ? 'body iframe' : Selector);
    while (true) {
        try {
            elementHandle = await page.$(Selector);
            if (elementHandle) {
                iframe = await elementHandle.contentFrame();
                console.log(' ... BODY IFRAME OK');
                break;
            }
        }
        catch (e) { }
        MAXLOOPWhile1--;
        if (MAXLOOPWhile1 <= 0) {
            console.log(' ... BODY IFRAME NO');
            iframe = false;
            break;
        }
    }
    return iframe;
}
exports.load_iFrame = load_iFrame;
async function getiFrame(page, Selector = '', textIN = '') {
    const iframes = await page.$$("iframe");
    let Rsp = false;
    let Frame;
    if (iframes) {
        for (const iframe of iframes) {
            Frame = await iframe.contentFrame();
            if (!Frame)
                continue;
            const context = await Frame.executionContext();
            if (textIN !== '') {
                Rsp = await context.evaluate((textin) => {
                    const el = document.querySelector("body").innerHTML;
                    if (el) {
                        if (el.indexOf(textin) > -1)
                            return true;
                        else
                            return false;
                    }
                    else
                        return false;
                }, textIN);
                if (Rsp)
                    break;
            }
            else if (Selector !== '') {
                let WLP = await WAITLoopB(Frame, [Selector]);
                if (WLP.result === true) {
                    Rsp = true;
                    break;
                }
            }
        }
        if (Rsp === false)
            Frame = false;
    }
    return { result: Rsp, iFrame: Frame };
}
exports.getiFrame = getiFrame;
async function renderPageToHtml(page) {
    const iframes = await page.$$("iframe");
    for (const iframe of iframes) {
        const frame = await iframe.contentFrame();
        if (!frame)
            continue;
        const context = await frame.executionContext();
        const res = await context.evaluate(() => {
            const el = document.querySelector("*");
            if (el)
                return el.outerHTML;
        });
        if (res) {
            await iframe.evaluate(async (a, res) => {
                try {
                    a.innerHTML = res;
                }
                catch (e) {
                    console.log('renderPageToHtml');
                    await (0, writefile_1.write_file)('./dados_pesquisados/ERROR_DADOS_.html', 'ERROR:#003:' + e + 'PAG:' + page);
                }
            }, res);
        }
    }
    return await page.evaluate(() => new XMLSerializer().serializeToString(document));
}
async function WAITVisible(page, ObjAR, TimeMAX = 5) {
    const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));
    while (true) {
        await sleep(990);
        for (let index = 0; index < ObjAR.length; index++) {
            const element = ObjAR[index];
            try {
                let SL = await page.waitForSelector(element, { visible: true, timeout: 10 });
                return { result: true, posElement: index, NmElement: element, Obj: SL };
            }
            catch (error) { }
        }
        TimeMAX--;
        if (TimeMAX <= 0) {
            return { result: false, posElement: -1, NmElement: '', Obj: undefined };
        }
        process.stdout.write('WAITVisible, ' + TimeMAX + "\r");
    }
}
exports.WAITVisible = WAITVisible;
async function getAllCookie(page) {
    try {
        const client = await page.target().createCDPSession();
        const all_browser_cookies = (await client.send('Network.getAllCookies')).cookies;
        const current_url_cookies = await page.cookies();
        const third_party_cookies = all_browser_cookies.filter(cookie => cookie.domain !== current_url_cookies[0].domain);
        return { result: true, all_browser_cookies, current_url_cookies, third_party_cookies };
    }
    catch (e) {
        return { result: false };
    }
}
exports.getAllCookie = getAllCookie;
async function getOption(page, option = 'Network.getAllCookies') {
    try {
        return await page._client.send(option);
    }
    catch (e) {
        return false;
    }
}
exports.getOption = getOption;
async function fmtCookie(iCookieAR, domain) {
    let OutCookie = '';
    return new Promise(async (resolve, reject) => {
        await Promise.all(iCookieAR.map(e => {
            if (e.domain)
                if (e.domain.indexOf(domain) > -1) {
                    OutCookie += e.name + '=' + e.value + '; ';
                }
        }));
        resolve(await OutCookie);
    });
}
exports.fmtCookie = fmtCookie;
async function iNjectCookie(page, iCookie) {
    try {
        await page._client.send("Network.clearBrowserCookies");
        await page.setCookie(iCookie);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.iNjectCookie = iNjectCookie;
