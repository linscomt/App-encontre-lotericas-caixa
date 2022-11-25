/*
*/
import 'dotenv/config';
import os from "os";
//import puppeteer from 'puppeteer';
//import { Puppeteer } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import puppeteer_stealth from 'puppeteer-extra-plugin-stealth';
import puppeteer_RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import {Cluster} from 'puppeteer-cluster';
import Looger from '../appMod/looger.out';const looger= new Looger('Puppeteer','TS');


//import antiCaptcha from '@antiadmin/anticaptchaofficial';




//import {createPageProxy} from 'puppeteer-proxy';
//import useProxy from 'puppeteer-page-proxy';



import {read_file} from '../appMod/readFile';
import {write_file} from '../appMod/writefile';
import {get_newAgent} from '../appMod/UserAgent.to.app';
import * as AppFunc from '../appMod/f.to.app';




import * as cheerio from 'cheerio';
//const lineReader = require('line-reader');

//import * as ProxyEphemeral from '../apiProxy/ApiProxyEphemeral_NDFetch';
//import * as FPuppeteer from '../appPuppeteer/f.puppeteer';


const MOVEJN=(process.env.MOVERJANELA!==''?process.env.MOVERJANELA:'0');
const MOVETOPJN=(process.env.MOVERJANELATOP!==''?process.env.MOVERJANELATOP:'0');


const TAMANHOJNW=(process.env.TMWJANELA!==undefined&&process.env.TMWJANELA!==''?process.env.TMWJANELA:'1024');
const TAMANHOJNH=(process.env.TMHJANELA!==undefined&&process.env.TMHJANELA!==''?process.env.TMHJANELA:'720');

const SHOWHIDEJANELA=(process.env.SHOWHIDEJANELA!==undefined&&process.env.SHOWHIDEJANELA==='true'?false:true);
const SHOWDUMPIO=(process.env.SHOWDUMPIO!==undefined&&process.env.SHOWDUMPIO==='true'?true:false);







/**
 * 
 * @param DATAPROXY 
 * @param AgentUSER 
 * @returns 
 */
export async function CriarPUU(PU, DATAPROXY, AgentUSER){
	if(PU.page!==undefined){
		await Destroi(PU);
	}
    /*-configuração-PU*/
    var outPU={}as any;// { page: any; browser: any; };
	async function CriarPU(){
        //let PU= await FPuppeteer.Create(DATAPROXY.URLPROXIE, '') as any;
		let cPULC= await Create(DATAPROXY.URLPROXIE, (DATAPROXY.URLPWD!==undefined&&DATAPROXY.URLPWD!==''?DATAPROXY.URLPWD:DATAPROXY.URLPWD)) as any;
        //if(PU) looger.consoleLog('PU...............!!.............',await PU);
        //if(cPULC.page) looger.consoleLog('PU.page..............!!.............',await cPULC.page);
        //if(PU.browser) looger.consoleLog('PU.browser..............!!.............',await PU.browser);

		if(cPULC!==undefined&&cPULC.page!==undefined){
			looger.consoleLog('CONFIGURAR  APP.............');
            await Configurar(cPULC.page,  AgentUSER);
			return cPULC;
		}
        
        
        looger.consoleLog('ERRO AO CRIAR APP.............',await cPULC);
        return false;

    }/**/
    looger.consoleLog('CRIAR APP.............');
    outPU = await CriarPU();
    
    if(outPU===false||outPU.page===undefined){
		looger.consoleEINFO('ERRO ao CRIAR APP.............');
		//resolve({result: false, status: ''});/*-SAI-*/return close_jn(PU);
        process.exit();
	}


    return outPU;
    
}

/**
 * 
 * @param URLProxy_PORT 
 * @param Proxy_username 
 * @param Proxy_password 
 * @returns 
 */
  async function Create( URLProxy_PORT, ProxyPWD, define=''){ //Proxy_username, Proxy_password
	//console.timeLog('TESTE', URLProxy_PORT);
	looger.consoleLog('PROXy',{PROXY_PORT: URLProxy_PORT, PROXY_PWD: ProxyPWD});
	

	// ./snap/chromium/2042/bin/chromium
	// /root@srv-sms:~# find / -name chromium
	// /root/snap/chromium
	const LOCALBROWSERso={
		'linux':'/snap/bin/chromium', 										//linux debian
		'centos':'/usr/bin/chromium-browser',
		'windows':'C:/Program Files/Google/Chrome/Application/chrome.exe',	//windows
	};

	let start_proxyes= (URLProxy_PORT!=''&&URLProxy_PORT!==false&&URLProxy_PORT!==undefined&&URLProxy_PORT!==null)?true:false;
	if(start_proxyes===true){
		if(URLProxy_PORT.includes('@')&&(ProxyPWD===''||ProxyPWD===undefined)){
			let P= URLProxy_PORT.split('@');
			URLProxy_PORT='http://'+P[1];
			ProxyPWD=P[0];
		}
	}else ProxyPWD='';
	//&&Proxy_username!=''&&Proxy_password!=''
    //console.log('start_proxyes',start_proxyes,URLProxy_PORT);
	await looger.consoleLog({URLProxy_PORT});

	//URLPROXIE: 'http://primo10-zone-resi-region-br:302515@pr.pyproxy.com:16666',
	//URLProxy_PORT='http://pr.pyproxy.com:16666';
	//ProxyPWD='primo10-zone-resi-region-br:302515';
    

	let LCBROWSER='';
	if(os.version().includes('Windows'))
	LCBROWSER=LOCALBROWSERso['windows'];
	else
	LCBROWSER=LOCALBROWSERso['linux'];

	/*
	if(define==='ClusTER'){
		return {'page':null, 'browser':null, 'Puppeteer': puppeteer};
	}
	else{
		*/


		let i=0;
		/*/while (i < LOCALBROWSERs.length) {*/
			try{
				return await puppeteer
					.use(puppeteer_stealth())
					.launch({
						dumpio: SHOWDUMPIO,                   //** Mostra DevTools listening  */
						headless: SHOWHIDEJANELA,

						ignoreDefaultArgs: ["--disable-extensions"],
						ignoreHTTPSErrors: true,
						devtools: false,
						executablePath: LCBROWSER, //LOCALBROWSERs[i],
						//userDataDir: "./outbrowser/user_data2",
						args: [
							(start_proxyes===true) ? '--proxy-server='+ URLProxy_PORT : '',
							//'--start-maximized',
							'--window-size='+TAMANHOJNW+','+TAMANHOJNH,
							'--window-position='+MOVEJN+','+MOVETOPJN,
							'--no-sandbox', 
							'--disable-setuid-sandbox',
							'--disable-web-security',
							'--disable-features=IsolateOrigins,site-per-process',

							"--disable-gpu",
							'--disable-dev-shm-usage',
							'--no-first-run',
							'--no-zygote',
							(SHOWHIDEJANELA===false?'':'--single-process'),  //ErrorEvent WebSocket
							'--use-gl=egl',
							//'--profile-directory=./outbrowser/profile'


						],
						//slowMo: 200
					})
					.then(async browser => {
						//console.log('BROWSER')
						const page = await browser.newPage();

						//await GotoContents(browser);

						//console.log('BROWSER1')

						if(start_proxyes && ProxyPWD!=''){
							//{ ProxyPWD: [ 'http', '//primo10-zone-resi-region-br', '302515' ] }
							if(ProxyPWD.includes('http')){
								ProxyPWD= ProxyPWD.substring(ProxyPWD.indexOf('//')+2);	
							}
							ProxyPWD= ProxyPWD.split(':');
							console.log({ProxyPWD});						
							await page.authenticate({username: ProxyPWD[0], password: ProxyPWD[1]});
						}
					
						await page.setViewport({ width: parseInt(TAMANHOJNW), height: parseInt(TAMANHOJNH) })

						//console.log('BROWSER2')
					
						return {'page':page, 'browser':browser, 'Puppeteer': puppeteer};
					});
				//break;
			}catch(e){
				console.log('ERROR#Create:',e)
			}

		/*/i++;}*/
  	/*}*/
		
}

/**
 * 
 * @param page 
 */
  async function Configurar(page, USerAgent=''){
	try{
		//console.log('Configurar:',page, USerAgent)
		await page.setDefaultNavigationTimeout(120000);
		await page.setUserAgent( (USerAgent!==''?USerAgent: get_newAgent(8)) );
	}catch(e){
		console.log('ERRO-CFG-PU',e);
	}
  }

/**
 * 
 * @param page 
 * @param urlProxy 
 * @returns 
 *-/
async function SetProxyPage(page, urlProxy){
	const pageProxy = await createPageProxy({
		page,
		proxyUrl: 'http://'+urlProxy,
	});
	//await page.setRequestInterception(true);
	return pageProxy;
}

export async function SetProxyPageB(page, urlProxy){
	await useProxy(page, 'http://'+urlProxy);
	const data = await useProxy.lookup(page);
	console.log(data.ip);
}
/**/

async function setWindowSize(page, width, height) {
	if(page) {
	  const session = await page.target().createCDPSession();
	  const {windowId} = await session.send('Browser.getWindowForTarget');
	  await session.send('Browser.setWindowBounds', {windowId, bounds: {width: width, height: height}});
	  await session.detach();
	} else {
	  await page.setViewport({width: width, height: height});
	}
}


export async function GotoContents(Pagina){
	console.log(Pagina.browserContexts().length);
	var x = await Pagina.targets();
	for(let i=0;i<x.length;i++)
	{
		if(x[i].type()==='browser')
		{
			console.log(x[i]['_targetInfo']['targetId']);
		}
	}
}


/**
 * 
 * @param page 
 * @param URLURI 
 * @param timeout 
 * @returns 
 */
 export async function GotoPagina(page, URLURI, timeout=240000){
	try {
		let response = await page.goto(URLURI ,{waitUntil: 'load', 'timeout': timeout });
		try{console.log(await response);}catch(e){console.log('ERRO-GOTO:',e);}
		return response;
	} catch (error) {
		//console.log('ERROR-GOTO-PAGINA:',error);
		return false;
	}
}

/**
 * 
 * @param page 
 * @param namefile 
 */  
  async function ScreenShot(page, namefile){
  	await page.screenshot({ path: 'ScreenShot_'+namefile+'.png', fullPage: true })
  }
/**
 * 
 * @param page 
 * @param objQueryName 
 * @param timeOut 
 * @returns 
 */
async function WaitLoadEnd(page,objQueryName, timeOut=30000){
	//try{  
  		//'input[id="user"]'
  		let OBJRESULT= await page.waitForSelector(objQueryName, {timeout: timeOut});
  		//const image_property = await OBJRESULT.getProperty("innerHTML");
  		//const src = await image_property.jsonValue();
  		//await write_file('./dados_pesquisados/SRC_OBJETO.html.json', src);
  		return OBJRESULT;
	//}catch(e){return false;}
}
/**
 * 
 * @param page 
 * @param objQueryName 
 * @param timeOut 
 * @returns 
 */
export async function WaitLoadForSelector(page,objQueryName, timeOut=30000){
try{  
  		//'input[id="user"]'
  		let OBJRESULT= await page.waitForSelector(objQueryName, {timeout: timeOut});
  		//const image_property = await OBJRESULT.getProperty("innerHTML");
  		//const src = await image_property.jsonValue();
  		//await write_file('./dados_pesquisados/SRC_OBJETO.html.json', src);
  		return {'result':true, 'Obj':OBJRESULT};
}catch(e){
	return {'result':false, 'Obj': undefined} 
}
}
/**
 * 
 * @param page 
 */
  async function AguardaLOADFULL(page){
  	await page.waitForNavigation({waitUntil: "domcontentloaded"})
  }
/**
 * 
 * @param browser 
 */  
 export async function Destroi(P){
	try{
		await DestroiP(P.page);
    	await P.browser.close();
		P.browser=undefined;
		P.page=undefined;
	}catch(e){}
 }

/**
 * 
 * @param browser 
 */  
async function DestroiP(page){
    await page.close()
}


/**
 * 
 * @param page 
 * @param CodeJS 
 */
export async function executeJavaScript(page, CodeJS){
	try{
		let R= await page.evaluate(CodeJS);
		await looger.consoleINFO('EXEC-JS:',await R);
		//console.log('EXEC-JS:',await R);
		return await R;
	}catch(e){
		await looger.consoleINFO('ERROR#FUNCTION-executeJavaScript:',e);
		//console.log('ERROR#FUNCTION-executeJavaScript:',e);
		return false;
	}
}

/**
 * 
 * @param page 
 * @param selector 
 */
export async function CLEAR_input(page,selector){
	try{await page.evaluate( () => document.querySelector(selector).value = "")}catch(e){
	try{const input = await page.$(selector);await input.click({ clickCount: 3 });await page.keyboard.press('Backspace')}catch(e){
	try{const inputValue = await page.$eval(selector, el => el.value);for (let i = 0; i < inputValue.length; i++){await page.keyboard.press('Backspace');}}catch(e){
	try{const input = await page.$(selector);await input.click({ clickCount: 3 });}catch(e){
	try{await page.$eval(selector, el => el.value = '');}catch(e){}}}}}
}


/**
 * 
 * @param lpage  
 * @returns 
 */  
export async function get_TextHtmlPage(lpage){
try{
	let html = await lpage.content()
	let $ = await cheerio.load(html);
	let hBody = await $('body').text();
	return await hBody;
}catch(e){return false}
}

/**
 * 
 * @param page 
 * @param tag 
 * @returns 
*/
export async function getObjCodeHtml(page, tag='html'){
try{	
	let html = await page.content()
	//return html;
	let $ = await cheerio.load(html);
	return await $(tag).html();
}catch(e){return false;}
}

/**
 * 
 * @param page 
 * @param tag 
 * @returns 
*/
export async function getLenHtml(page){
	try{	
		let html = await page.content()
		return html.length;
	}catch(e){return false;}
}


/*-Option Select-Option.Select-OptionSelect-*/
export async function SelectSearchValue(page, Valor){
	try{
		return await page.$$eval('option',options => {options.find(o => o.innerText === Valor)?.value});
	}catch(e){return false}
}
export async function SelectValue(page, Selector, optionValue){
	try{
		return await page.select(Selector, optionValue);
	}catch(e){return false}
}

/**
 * 
 *-/
 async function Events_ON(page, namefile){
	//SAve html
	page.on('response', async(res) => {
		let dt = new Date().getTime();
		let R=await res.buffer();
		//console.log({'RESPONSE':res});
		// save all the data to SOMEWHERE_TO_STORE
		//WriteFile_file.write_file('./out-response_'+namefile+'.'+dt+'.html', res);
	});

	page.on('response', response => {
		const status = response.status()
		if ((status >= 300) && (status <= 399)) {
		  console.log('Redirect from', response.url(), 'to', response.headers()['location'])
		}
	});
}/**/

/**
 * 
 * @param page 
 * @param onEvent 
 * @param oFunction 
 */
export async function Events_ON(page, onEvent, oFunction){
	page.on(onEvent, async(res) => {
		oFunction(res);
	});
}
export async function Events_ONCE(page, onceEvent, oFunction){
	page.on(onceEvent, async (request) => {
		oFunction(request);
	});
}
async function EventsPxONCE(page, mClass,onceEvent, oFunction){
	page.once(onceEvent, async (request) => {
		oFunction(request, mClass);
	});
}

async function WaitAllIMG(page){
    await page.evaluate(async () => {
        const selectors = Array.from(document.querySelectorAll("img"));
        await Promise.all(selectors.map(img => {
          if (img.complete) return;
          return new Promise((resolve, reject) => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', reject);
          });
        }));
    })
}

/**
 * 
 * @param page 
 * @returns 
 */
async function WaitLoadPage(page){
	return page.waitForNavigation({ waitUntil: 'domcontentloaded' }) //networkidle2//networkidle0//domcontentloaded//load
    //await navigationPromise1;
    //await page.waitForResponse(response => response.status() === 200)
}

async function WaitLoad200(page){
	return await page.waitForResponse(response => response.status() === 200);
}

async function WAITLoop(page,element, MAXtime=5){
	while(true){
		try {//await FPuppeteer.WaitLoadEnd(page, element, 1);
			await page.waitForSelector(element, {timeout: 100});
			return true;
		} catch (error) {}
		//await page.waitForTimeout(1000);
		await AppFunc.wsleep(900);
	    MAXtime--;
	    if(MAXtime<=0){return false;}
		console.log('WAITLOOP',MAXtime);
	}
}

export async function WAITLoopB(page, ObjAR:Array<any>, TimeMAX=5){
	//ObjAR= ['p[class="card-p"]', 'a[class="card-destaque"]', 'body > app-root > app-container-component > app-home-container > section > div > app-permissao-usuario-toggle > div > p'];
    //let MAXLOOP= ObjAR.length;
    //let LOOPWhile1=0;
	try{
		const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));
		while(true){
			//await page.waitForTimeout(990);
			//await AppFunc.wsleep(990);
			await sleep(990);
			for (let index = 0; index < ObjAR.length; index++) {
				const element = ObjAR[index];
				try {//await FPuppeteer.WaitLoadEnd(page, ObjAR[LOOPWhile1], 10);
					//console.log('ELEMENT-LOOP-B:',element)
					let SL= await page.waitForSelector(element, {timeout: 10});
					//console.log('SL:',SL.page.content())
					return {result:true, posElement: index, NmElement: element, Obj: SL};
    	    	} catch (error) {}
			}

    	    //LOOPWhile1++;
    	    //if(LOOPWhile1 >= MAXLOOP){
    	    //    LOOPWhile1=0;
    	        TimeMAX--;
    	    //}

    	    if(TimeMAX <=0){
				return {result:false, posElement: -1, NmElement: '', Obj: undefined};
    	    }
			process.stdout.write('WAITLOOP_B, '+TimeMAX+"\r");
    	}
	}catch(e){return {result:false, posElement: -1, NmElement: '', Obj: undefined};}
}

async function getBoundingOBJ(page, Selector){
try{	
	return await page.evaluate((selector: string) => {
		return document.querySelector(selector).getBoundingClientRect();
	},Selector);
}catch(e){return false;}
}
export async function MouseMoveClick(page, Selector){
	/*
	const box = element.boundingBox();
    const x = box.x + (box.width/2);
    const y = box.y + (box.height/2);
	
	document.querySelector("#topMenu > span:nth-child(2) > div:nth-child(1)").getBoundingClientRect()
	DOMRect 
		bottom: 83
		height: 36
		left: 294.359375
		right: 377.6875
		top: 47
		width: 83.328125
		x: 294.359375
		y: 47
	*/
	try{
		let Bxy= await getBoundingOBJ(page, Selector);
		if(Bxy!==false&&Bxy!==undefined){
    		await page.mouse.move(Bxy.x, Bxy.y);
    		await page.mouse.down();
    		await page.waitForTimeout(250);
    		await page.mouse.up();
		}
	}catch(e){}

    //await page.focus('body' );
    //await page.keyboard.type('\n');
}

/**
 * 
 * @param page 
 * @param element 
 * @returns 
 */
export async function Click(page, element){
	try{let C=await page.click(element);/**-/await looger.consoleINFO('Click',C);/**/await page.waitForTimeout(1000);return true;}catch(e){return false;}
}

/**
 * 
 * @param page 
 * @param element XPath
 */
export async function XPath_Click(page, element){
	const elements_input1 = await page.$x(element);
	for (let index = 0; index < elements_input1.length; index++) {
		const element = elements_input1[index];
		try{
			await element.click();
			return true;
		}catch(e){}				
	}
	return false;
}

/**
 * 
 * @param page 
 * @param Selector 
 * @returns 
 */
export async function ClickB(page, Selector){
	try{	
		return await page.evaluate((selector: string) => {
			(<HTMLInputElement>document.querySelector(selector)).click();
			return true;
		},Selector);
	}catch(e){return false;}
}

    
export async function OptionSelect(page, Selector, sValue, sName){
	try {
		await Click(page, Selector);
		await AppFunc.wsleep(100);
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('Enter');

		await page.select(Selector, sValue);

		if(sName !==''){
			const selectElem = await page.$(Selector);
			await selectElem.type(sName);
		}

		return true;
	} catch (error) {}
	return false;
}

async function OptionselectB(page, Selector, sValue){
	let tag_element = await page.querySelector(Selector);
	let options_text = await tag_element.querySelectorAllEval(
		'option',
		'options => options.map(option => option.value)'
	);

	if(options_text.includes(sValue))
		await page.querySelectorEval(Selector, 'element => element.value = "{sValue}"');

	return await page.querySelectorEval(Selector, 'element => element.value');


}
async function OptionselectByText(page, selector, value) {
    return await page.evaluate(
        (css, text) => {
            let sel = document.querySelector(css)
            for (let option of [...document.querySelectorAll(css + ' option')]) {
                if (text === option.textContent) {
                    sel.value = option.innerHTML
                }
            }

            const event = new Event('change', { bubbles: true })
            sel.dispatchEvent(event)
        },
        selector,
        value,
    )
}


export async function GetSrcObjHtml(page, selector){
	try{	
		return await page.evaluate((selector: string) => {
			//return document.querySelector(selector).textContent;
			return document.querySelector(selector).innerHTML.replace(/\t/g,'').replace(/\n/g,'').trim();
		},selector);
	}catch(e){return false;}
}

export async function GetTextObjHTML(page, selector){
try{	
	return await page.evaluate((selector: string) => {
		//return document.querySelector(selector).textContent;
		return document.querySelector(selector).textContent.replace(/\t/g,'').replace(/\n/g,'').trim();
	},selector);
}catch(e){return false;}
}
export async function GetValueObjInput(page, selector){
	try{	
		return await page.evaluate((selector: string) => {
			//return document.querySelector(selector).textContent;
			return (<HTMLInputElement>document.querySelector(selector)).value.replace(/\t/g,'').replace(/\n/g,'').trim();
		},selector);
	}catch(e){return false;}
}
export async function setValueInputA(page, selector, value){
	try{
		await page.focus(selector)
		await page.keyboard.type(value);
		return true;
	}catch(e){return false;}
}

export async function setValueInputB(page, selector, value: string | number) {
	await page.waitFor(selector);
	await page.evaluate((data) => {
		try{document.querySelector(data.selector).select();}catch{}
		return document.querySelector(data.selector).value = data.value
	}, {selector, value});
}



/*-***--*iFrames*-*/
//src="corpo.php?src=consulta/index.php"



/*--/./IFRAME--*/
async function loadiFrame(page, Selector, textIN, MAXLOOPWhile1){
    var elementHandle:any;
    var iframe:any;
    //let MAXLOOPWhile1=10;
    while(true){
        try{
            elementHandle = await page.$(Selector);
			if(elementHandle){
                iframe = await elementHandle.contentFrame();
                console.log(' ... BODY IFRAME OK');
                break;
            }
        }catch(e){}
        
        MAXLOOPWhile1--;
        if(MAXLOOPWhile1 <=0){
            console.log(' ... BODY IFRAME NO');
            iframe=false;
            break;
        }
    }
    return iframe;
    
}/*--/./IFRAME--*/


export async function load_iFrame(page, Selector='', MAXLOOPWhile1=1){
    var elementHandle:any;
    var iframe:any;//
	Selector=(Selector===''?'body iframe':Selector);
    //let MAXLOOPWhile1=10;
    while(true){
        try{
            elementHandle = await page.$(Selector);
            if(elementHandle){
                iframe = await elementHandle.contentFrame();
                console.log(' ... BODY IFRAME OK');
                break;
            }
        }catch(e){}
        
        MAXLOOPWhile1--;
        if(MAXLOOPWhile1 <=0){
            console.log(' ... BODY IFRAME NO');
            iframe=false;
            break;
        }
    }
    return iframe;
    /*--/./IFRAME--*/
}

export async function getiFrame(page, Selector='',textIN=''){
	const iframes = await page.$$("iframe");
	let Rsp:any=false;
	let Frame:any;
	if(iframes){
		for (const iframe of iframes) {
			Frame = await iframe.contentFrame();	
			if (!Frame) continue;
			//console.log('F',iframe, Frame)
			const context = await Frame.executionContext();
			//console.log('context:',context)
			if(textIN!==''){
				Rsp = await context.evaluate((textin) => {
					const el = document.querySelector("body").innerHTML;
					if (el){if(el.indexOf(textin)>-1)return true;else return false;}else return false;
				},textIN);
				if(Rsp)	break;
			}
			else
			if(Selector!==''){
				let WLP= await WAITLoopB(Frame, [Selector]);
				if(WLP.result===true){
					Rsp=true;
					break;
				}
			}
		}
		if(Rsp===false)Frame=false;
	}
	return {result:Rsp, iFrame: Frame};
}
/*-COpia Iframe*/
async function renderPageToHtml(page){
	const iframes = await page.$$("iframe");
	for (const iframe of iframes) {
	  const frame = await iframe.contentFrame();
	  if (!frame) continue;
	  
	  const context = await frame.executionContext();
	  const res = await context.evaluate(() => {
		const el = document.querySelector("*");
		if (el) return el.outerHTML;
	  });

	  if (res) {
		await iframe.evaluate(async (a, res) => {
		  try{	  
		  a.innerHTML = res;
		  }catch(e){
			  console.log('renderPageToHtml');
			  await write_file('./ERROR_DADOS_.html', 'ERROR:#003:'+e+'PAG:'+page);
		  }
		}, res);
	  }
	}
  
	return await page.evaluate(() => new XMLSerializer().serializeToString(document));
}
/*--*/
export async function WAITVisible(page, ObjAR:Array<any>, TimeMAX=5){
	const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));
	while(true){
		await sleep(990);
		for (let index = 0; index < ObjAR.length; index++) {
			const element = ObjAR[index];
			try {
				let SL= await page.waitForSelector(element, {visible: true, timeout: 10});
				return {result:true, posElement: index, NmElement: element, Obj: SL};
        	} catch (error) {}
		}
		TimeMAX--;
        if(TimeMAX <=0){
			return {result:false, posElement: -1, NmElement: '', Obj: undefined};
        }
		process.stdout.write('WAITVisible, '+TimeMAX+"\r");
    }
}



/*-Cookie-*/
export async function getAllCookie(page){
	try{
		const client = await page.target().createCDPSession();
		const all_browser_cookies = (await client.send('Network.getAllCookies')).cookies;
		const current_url_cookies = await page.cookies();
		const third_party_cookies = all_browser_cookies.filter(cookie => cookie.domain !== current_url_cookies[0].domain);

		//console.log(all_browser_cookies); // All Browser Cookies
		//console.log(current_url_cookies); // Current URL Cookies
		//console.log(third_party_cookies); // Third-Party Cookies

		return {result:true, all_browser_cookies, current_url_cookies, third_party_cookies}
		
	}catch(e){return {result:false} }
}
export async function getOption(page, option='Network.getAllCookies'){
	try{
		return await page._client.send(option);
	}catch(e){return false}
}
export async function fmtCookie(iCookieAR, domain){
	let OutCookie:any='';
return new Promise(async(resolve, reject) => {
	await Promise.all(iCookieAR.map(e => {
		if(e.domain)
		if(e.domain.indexOf(domain)>-1){
			OutCookie+=e.name+'='+e.value+'; ';
		}
	}));
	resolve(await OutCookie)
	//expires: 1674338371.271868,
	//name: '_GRECAPTCHA',
	//value: '09AOWOVp27dShHp203EgYR5TwbGnSNBhJDVmUpqL__XjeyoFfovsnjJWMrPa2Js2VT_ZNeaa6f717gxjM4JC8-Lq8',
	//domain: 'www.google.com',
		
});	
}

export async function iNjectCookie(page, iCookie){
	try{
		await page._client.send("Network.clearBrowserCookies");
		await page.setCookie(iCookie); // method 2
		return true;
	}catch(e){return false}
}



/*-Export-*-/
export {
	Create, Configurar, GotoPagina, ScreenShot, WaitAllIMG, WaitLoadEnd, WaitLoadPage, WaitLoad200, 
	WAITLoop, WAITLoopB, AguardaLOADFULL, WaitLoadForSelector, CLEAR_input, get_codeHtml, Destroi, Click, 
	EventsPxONCE
}
/**/