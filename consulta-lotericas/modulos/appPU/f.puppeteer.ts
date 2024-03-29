/*
f.puppeteer.ts
*/
import 'dotenv/config';
import os from "os";
//import { Puppeteer } from 'puppeteer';

//import puppeteer from 'puppeteer';
import puppeteer from 'puppeteer-extra';

import puppeteer_stealth from 'puppeteer-extra-plugin-stealth';
import puppeteer_RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import {Cluster} from 'puppeteer-cluster';

//"puppeteer-extra-plugin-adblocker": "^2.11.3",
//"puppeteer-extra-plugin-anonymize-ua": "^2.2.8",
//"puppeteer-extra-plugin-block-resources": "^2.2.4",
//"puppeteer-screen-recorder": "^2.0.2",

// ES6
//import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';


//npm i @muraenateam/puppeteer-cluster
import * as cheerio from 'cheerio';

import Looger from '../appMod/looger.out';const looger= new Looger('Puppeteer','TS');


//import antiCaptcha from '@antiadmin/anticaptchaofficial';

import {start_teste} from './f.puppeteer.cluster.std';


//import {createPageProxy} from 'puppeteer-proxy';
//import useProxy from 'puppeteer-page-proxy';



import {read_file} from '../appMod/readfile';
import {write_file} from '../appMod/writefile';
import {get_newAgent} from '../appMod/UserAgent.to.app';
import * as AppFunc from '../appMod/f.to.app';





//const lineReader = require('line-reader');

//import * as ProxyEphemeral from '../apiProxy/ApiProxyEphemeral_NDFetch';
//import * as FPuppeteer from '../appPuppeteer/f.puppeteer';


const MOVEJN=(process.env.MOVERJANELA!==''?process.env.MOVERJANELA:'0');
const MOVETOPJN=(process.env.MOVERJANELATOP!==''?process.env.MOVERJANELATOP:'0');


const TAMANHOJNW=(process.env.TMWJANELA!==undefined&&process.env.TMWJANELA!==''?process.env.TMWJANELA:'1024');
const TAMANHOJNH=(process.env.TMHJANELA!==undefined&&process.env.TMHJANELA!==''?process.env.TMHJANELA:'720');

const SHOWHIDEJANELA=(process.env.SHOWHIDEJANELA!==undefined&&process.env.SHOWHIDEJANELA==='true'?false:true);
const SHOWDUMPIO=(process.env.SHOWDUMPIO!==undefined&&process.env.SHOWDUMPIO==='true'?true:false);

const USERDATA_PROFILE=(process.env.USERDATA_PROFILE!==undefined&&process.env.USERDATA_PROFILE!==''?process.env.USERDATA_PROFILE:'');



const PathToExtension='D:/xampp/htdocs-hostnames/santanseder/nodepu/extensao/ohjocgmpmlfahafbipehkhbaacoemojp/1.2.4_0';




/**
 * 
 * @param DATAPROXY 
 * @param AgentUSER 
 * @returns 
 */
export async function CriarPUU(PU, DATAPROXY, AgentUSER, Profile=''){
	if(PU.page!==undefined){
		await Destroi(PU);
	}
    /*-configuração-PU*/
    var outPU={}as any;// { page: any; browser: any; };
	async function CriarPU(){
        //let PU= await FPuppeteer.Create(DATAPROXY.URLPROXIE, '') as any;
		let cPULC= await Create(DATAPROXY.URLPROXIE, (DATAPROXY.URLPWD!==undefined&&DATAPROXY.URLPWD!==''?DATAPROXY.URLPWD:DATAPROXY.URLPWD), Profile) as any;
        //if(PU) looger.consoleLog('PU...............!!.............',await PU);
        //if(cPULC.page) looger.consoleLog('PU.page..............!!.............',await cPULC.page);
        //if(PU.browser) looger.consoleLog('PU.browser..............!!.............',await PU.browser);

		if(cPULC!==undefined&&cPULC.page!==undefined){
			looger.consoleLog('CONFIGURAR  APP.............', Profile);
            await Configurar(cPULC.page,  AgentUSER);
			return cPULC;
		}
        
        
        looger.consoleLog('ERRO AO CRIAR APP.............',Profile,await cPULC);
        return false;

    }/**/
    //looger.consoleLog('CRIAR APP.............');
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
  async function Create( URLProxy_PORT, ProxyPWD, profile=''){ //Proxy_username, Proxy_password
	//console.timeLog('TESTE', URLProxy_PORT);
	looger.consoleLog('PROXy',{PROXY_PORT: URLProxy_PORT, PROXY_PWD: ProxyPWD}, profile);
	
	/* find / -iname chromium*
	 ./snap/chromium/2042/bin/chromium
	 /root@srv-sms:~# find / -name chromium
	 /root/snap/chromium
	 /etc/chromium-browser
	 /usr/lib/chromium-browser
	 /usr/share/chromium-browser
	 /usr/bin/chromium-browser
	 
	*/
	const LOCALBROWSERso={
		'linux':'/snap/bin/chromium', 										//linux debian
		'centos':'/usr/bin/chromium-browser',
		//'windows':(define=='edge'?'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe':'C:/Program Files/Google/Chrome/Application/chrome.exe'),
		//'windows':'C:/Users/Admin01/AppData/Local/Programs/Opera/launcher.exe' //windows - opera : erro
		//'windows':'C:/Program Files/Google/Chrome/Application/chrome.exe',	//windows - chrome
		//'windows':'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'	//windows - msedge
		'windows':'D:/xampp/htdocs-hostnames/chromedriver/chrome-win/chrome.exe',
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
	looger.consoleLog({URLProxy_PORT},{ProxyPWD});

	//URLPROXIE: 'http://primo10-zone-resi-region-br:302515@pr.pyproxy.com:16666',
	//URLProxy_PORT='http://pr.pyproxy.com:16666';
	//ProxyPWD='primo10-zone-resi-region-br:302515';
    

	let LCBROWSER='';
	if(os.version().includes('Windows'))
	LCBROWSER=LOCALBROWSERso['windows'];
	else
	LCBROWSER=LOCALBROWSERso['linux'];
	//looger.consoleLog({LCBROWSER});

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
						
						ignoreDefaultArgs: [
							"--disable-extensions",
							'--disable-dev-shm-usage',
						],
						
						ignoreHTTPSErrors: true,
						devtools: false,
						executablePath: LCBROWSER, //LOCALBROWSERs[i],
						//userDataDir: USERDATA_PROFILE,

						//C:\Users\Admin01\AppData\Local\Temp\puppeteer_dev_profile-Gb5kpj\Default
						//userDataDir: 'D:\\xampp\\htdocs-hostnames\\santanseder\\nodepu\\PUProfile\\puppeteer_dev_profile-'+(profile!=''?profile:'User000'),

						args: [
							//'--profile-directory='+(profile!=''?profile:'Default'),
							//'--user-data-dir='+USERDATA_PROFILE,

							//'--disable-extensions-except='+PathToExtension,
      						//'--load-extension='+PathToExtension,
							
							(start_proxyes===true) ? '--proxy-server='+ URLProxy_PORT : '',
							(SHOWHIDEJANELA===false?'':'--single-process'),  //ErrorEvent WebSocket
							//'--start-maximized',
							'--window-size='+TAMANHOJNW+','+TAMANHOJNH,
							'--window-position='+MOVEJN+','+MOVETOPJN,
							'--no-sandbox', 
							'--disable-setuid-sandbox',
							'--disable-web-security',
							'--disable-features=IsolateOrigins,site-per-process',
							"--disable-gpu",
							'--no-first-run',
							'--no-zygote',
							'--use-gl=egl',
							//"--enable-automation",


							/*-ERRO-RESOLUCAO=> Error: We either navigate top level or have old version of the navigated frame 
								Erro surgi por usar anúncios e análises do Google envolvendo iframes de forma a acionar atualizações.
								entao adicionamos arg=--disable-site-isolation-trials como gambiarra 
								e removemos arg=--disable-dev-shm-usage
							-*/
							'--disable-site-isolation-trials',
							//'--disable-dev-shm-usage',
							
							//'--disk-cache-dir',
							//'--media-cache-size=0',
							//'--disk-cache-size=0',

							'--disable-background-timer-throttling',
  							'--disable-client-side-phishing-detection',
  							//'--disable-default-apps',
  							//'--disable-extensions',
  							'--disable-hang-monitor',
  							//'--disable-popup-blocking',

							
							//'--profile-directory=none',
							//'--user-data-dir',
							//'--user-data-dir=C:/Users/[USERNAME]/AppData/Local/Google/Chrome/User Data',
							//'--user-data-dir=./profile',
							
							//'--user-data-dir=User002',

							
							//'--user-data-dir=/user/data/directory/profile_n'
							//'--profile-directory=D:\\xampp\\htdocs-hostnames\\santanseder\\nodepu\\profile\\',
							//https://chrome.google.com/webstore/detail/hideme-proxy/ohjocgmpmlfahafbipehkhbaacoemojp


							//'--incognito',

							
						],
						//slowMo: 200
					})
					.then(async browser => {
						
						/**-/
						const backgroundPageTarget = await browser.waitForTarget(
							target => target.type() === 'background_page'
						);
						console.log({backgroundPageTarget});
						const backgroundPage = await backgroundPageTarget.page();
						console.log({backgroundPage});
						/**/

						//const targets = await browser.targets();
						//console.log({targets});
//
						//const extensionName = 'hide.me Proxy';
						
						/**-/const extensionTarget = targets.find(({ _targetInfo }) => {
							return _targetInfo.title === extensionName && _targetInfo.type === 'background_page';
						});/**/

						//console.log('BROWSER')
						//looger.consoleLog(browser, 'newpage');
						const page = await browser.newPage();
						

						//await page.emulateMedia("screen");
						//looger.consoleLog({page});

						//await GotoContents(browser);

						//console.log('BROWSER1')

						if(start_proxyes && ProxyPWD!='' && ProxyPWD!==undefined){
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
					
						//looger.consoleLog('OUT-THEN-Create');
						return {'page':page, 'browser':browser, 'Puppeteer': puppeteer, 'Client': await page.target().createCDPSession()};
					});
				//break;
			}catch(e){
				console.log('ERROR#Create:',e);
				//ERROR#Create: Error: Failed to launch the browser process!
			}

			//looger.consoleLog('OUT-Create');

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

async function backgroundPageTarget(browser){
	const backgroundPageTarget = await browser.waitForTarget(
    	target => target.type() === 'background_page'
  	);
  	const backgroundPage = await backgroundPageTarget.page();
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
		//waitUntil: ["load", "domcontentloaded", "networkidle2", "networkidle0"]
		let response = await page.goto(URLURI ,{waitUntil: ["load", "domcontentloaded"], 'timeout': timeout });
		await AppFunc.wsleep(1000);
		try{console.log(await response);}catch(e){
			console.log('ERRO-GOTO:',e);
			return {success:response, message: e};			
		}
		return {success:response, message: '_OK_'};
	} catch (error) {
		//console.log('ERROR-GOTO-PAGINA:',error);
		return {success:false, message: error.toString() };
	}
}

/**
 * 
 * @param page 
 * @param namefile 
 */  
export async function ScreenShot(page, namefile){
	try{
		await page.screenshot({ path: namefile+'.png', fullPage: true });
		await looger.consoleINFO('SCREENShot-file:',namefile+'.png');
	}catch(e){console.log('ERROR:#-ScreenShot',e)}
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
		let R= await page.evaluate((CodeJS)=>{CodeJS},CodeJS);
		await looger.consoleINFO('EXEC-JS:',await R, CodeJS);
		//console.log('EXEC-JS:',await R);
		return await R;
	}catch(e){
		await looger.consoleINFO('ERROR#FUNCTION-executeJavaScript:',e, CodeJS);
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


export async function getHtmlObj(page){
	try {
		let html = await page.content()
		return await cheerio.load(html);	
	} catch (error) {return false;}
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

async function SaveBufferEvent(){

}
/**
 * 
 * @param page 
 * @param onEvent - requestfinished - close - dialog - requestfailed - worker - request - console - workercreated - 
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
export async function WaitLoadPage(page){
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
					//console.log('SL:',SL);//.page.content()
					return {result:true, posElement: index, NmElement: element, Obj: SL};
    	    	} catch (error) {
					if(error.toString().indexOf('Session closed')>-1){
						return {result:false, posElement: -1, NmElement: 'Session_closed', Obj: undefined};
					}else if(error.toString().indexOf('TimeoutError: waiting for selector')>-1){}
					else console.log( {'x-ERROR-WAITLoopB':error.toString()});
				}
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

export async function GetTextObjHTML(page, selector, ret=false){
try{	
	return await page.evaluate((selector: string, ret) => {
		//return document.querySelector(selector).textContent;
		if(ret==true){
			//let RR=document.querySelector(selector).textContent.replace(/\t/g,'').replace(/\n/g,'').trim();
			let RR=(<HTMLElement>document.querySelector(selector)).innerText.replace(/\t/g,'').replace(/\n/g,'').trim();
			RR=RR.replace('\\r\\n','@##@');
			RR=RR.replace('\\n','@##@');
			RR=RR.replace('\\r','@##@');
			RR=RR.replace('\\t','@##@');
			RR=RR.replace('\r\n','@##@');
			RR=RR.replace('\n','@##@');
			RR=RR.replace('\r','@##@');
			RR=RR.replace('\t','@##@');
			return RR;
		}else
		return document.querySelector(selector).textContent.replace(/\t/g,'').replace(/\n/g,'').trim();
	},selector, ret);
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


export async function setFocus(page, selector){
	try{
		await page.focus(selector);
		return true;
	}catch(e){return false;}
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
		await client.detach();

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

/**
 * 
 * @param page 
 * @param selector 
 * @returns 
 */
export async function Wait_ForNotDisabled(page, selector){
	await page.waitForSelector(selector+':not([disabled])');
}
export async function check_isdisabledB(page, Selector, classDisabled){
	await page.waitForSelector(Selector); 
	const isDiabled = await page.evaluate((selector: string, classDisabled) => {
		if(document
        .querySelector(selector)
        .classList.contains(classDisabled)){
			return true;
		}
		else
		if(document.querySelector(selector).hasAttribute("disabled")){
			return true;
		}
		else
		return false;

	},Selector, classDisabled);
	console.log('check_disabledB', isDiabled);
	return isDiabled;
}


export async function GetUrl(page){
	try{return await page.url();}catch(e){console.log('GET_URL-ERRO:',e); return false;}
}
export async function CompareUrl(page, Url){
	try{if(Url == await page.url()) return true;}catch(e){console.log('GET_URL-ERRO:',e); return false;}
}


/**-/
export async function VideoRecordPU(page){
	//let cColor='black' || '#35A5FF';
	const Config = {
		followNewTab: true,
		fps: 25,
		ffmpeg_Path: '<path of ffmpeg_path>' || null,
		videoFrame: {
		  width: 1024,
		  height: 768,
		},
		videoCrf: 18,
		videoCodec: 'libx264',
		videoPreset: 'ultrafast',
		videoBitrate: 1000,
		autopad: {
		  color: 'black' || '#35A5FF',
		},
		aspectRatio: '4:3',
	};

	return new PuppeteerScreenRecorder(page, Config);
	//await recorder.start(outvideopath);
	//await recorder.stop();
}
/**/


/*-Export-*-/
export {
	Create, Configurar, GotoPagina, ScreenShot, WaitAllIMG, WaitLoadEnd, WaitLoadPage, WaitLoad200, 
	WAITLoop, WAITLoopB, AguardaLOADFULL, WaitLoadForSelector, CLEAR_input, get_codeHtml, Destroi, Click, 
	EventsPxONCE
}
/**/