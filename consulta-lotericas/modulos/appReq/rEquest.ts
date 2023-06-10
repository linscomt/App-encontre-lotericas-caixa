

/*-rEquest.ts-*/

import Zlib from 'zlib';
import request from 'request';
//npm i @types/request
//npm install --save-dev @types/request
//npm install --save @types/request-promise
//npm i --save @types/request-promise-native
import fetch from 'node-fetch';
import axios from 'axios';

//import HttpsProxyAgent from 'https-proxy-agent';
//import * as HttpsProxyA from 'https-proxy-agent';
//import https from 'https';


export var jar;
/*
import HttpsProxyAgent from 'https-proxy-agent';
import * as HttpsProxyA from 'https-proxy-agent';
var options = {
	proxy: false,
	httpsAgent: (ProxySS!==''?new HttpsProxyA.HttpsProxyAgent(ProxySS):null),
}			
*/
export async function curl_axios(options){		 
	return new Promise<{result: boolean, Header: any, response: string}>(async(resolve) => { 
		await axios.request(options)
		.then(async function (response) {
			 //console.log('DATA-AXIOS:',response.data);
			 let TTP= await response.headers;
			 let RRR= await response.data;
			 resolve({result: true, Header: TTP, response: RRR});
		})
		.catch(function (error) {
			 //console.error(error);
			 resolve({result: false, Header: error.headers, response: 'ERROR#curl_axios-RESPONSE:'+error.code});
		});
	})
	.catch(function (error) {
		return {result: false, Header: '', response: 'ERROR#curl_axios:'+error}
	})
}

//Adicionar  ">redirect: 'manual-dont-change',<" em options faz receber header response
export async function curl_fetch(URL: any, Options){
	return new Promise<{result: boolean, Header: any, response: string}>(async(resolve) => {
		try {
			var response= await fetch(URL, Options);	
			try{
				let TTP= await response.headers.raw();
				let RRR= await response.text();
				resolve({result: true, Header: TTP, response: await RRR});
			}catch(e){
				resolve({result: false, Header: '', response: 'ERROR#CURL_FETCH-RESPONSE:'});
			}
		} catch (error) {
			//let E='error';
			//if(error.indexOf('reason:')>-1){
			//	E=error.substring(error.indexOf('reason:'))	
			//}
			resolve({result: false, Header: '', response: 'ERROR#CURL_FETCH:'+error})	
		}
	})
}
	
/*
var options = {
	proxy: (DATAPROXY!==undefined&&DATAPROXY.URLPROXIE!==undefined&&DATAPROXY.URLPROXIE!==''?DATAPROXY.URLPROXIE:null),
}
*/
export async function curl_request(options) {
    return new Promise<{error:any, response:any, body:string}>(async resolve => 
		request(options, (error, response, body) => 
			resolve({ error, response, body })
		));
}
export async function curl_Request(options) {
	try{
    	return new Promise<{result: boolean, Header: any, response: any, body:string, error?:any}>(async resolve =>{
			await setJar(await request.jar());
			options.jar = await getJar();
			logCookies(await getJar());
			//console.log('options:',options);
			
			request(options, (error, response, body) => {
				let H:any;try{H=response.headers;}catch(error){H=''}
				let Error=(error!==undefined&&error!==null?error.toString():'');
				resolve({result: true, Header: H, response, body, error: Error })
			})
		});
	}catch(e){
		let Error=(e!==undefined&&e!==null?e.toString():'');
		return {result: false, Header: '', response: 'ERROR#CURL_REQUEST:'+e,'body':'', error:Error };
	}
}



async function curl_request2(options:any){

	const req = request(options, res => {
	    let buffers = []
	    let bufferLength = 0
	    let strings = []

	    const getData = chunk => {
	        if (!Buffer.isBuffer(chunk)) {
	            strings.push(chunk)
	        } else if (chunk.length) {
	            bufferLength += chunk.length
	            buffers.push(chunk)
	        }
	    }

	    const endData = () => {
	        let response = {code: 200, body: '' }as any;
	        if (bufferLength) {
	            response.body = Buffer.concat(buffers, bufferLength)
	            if (options.encoding !== null) {
	                response.body = response.body.toString(options.encoding)
	            }
	            buffers = []
	            bufferLength = 0
	        } else if (strings.length) {
	            if (options.encoding === 'utf8' && strings[0].length > 0 && strings[0][0] === '\uFEFF') {
	                strings[0] = strings[0].substring(1)
	            }
	            response.body = strings.join('')
	        }
	        console.log('response', response)
	    };

	    switch (res.headers['content-encoding']) {
	        // or, just use zlib.createUnzip() to handle both cases
	        case 'gzip':
	            res.pipe(Zlib.createGunzip())
	                .on('data', getData)
	                .on('end', endData)
	            break;
	        case 'deflate':
	            res.pipe(Zlib.createInflate())
	                .on('data', getData)
	                .on('end', endData)
	            break;
	        default:
	            res.pipe(Zlib.createInflate())
	                .on('data', getData)
	                .on('end', endData)
	            break;
	    }
	});

}

export async function getJar() {
	if(jar){
		jar._jar.store.getAllCookies(function(err, cookieArray) {
			if(err) throw new Error("Failed to get cookies");
			//console.log('**1*** getAllCookies:',JSON.stringify(cookieArray, null, 4));
		});
		return jar;
	}
	else {
	  jar = request.jar();
	  jar._jar.store.getAllCookies(function(err, cookieArray) {
        if(err) throw new Error("Failed to get cookies");
        //console.log('**2*** getAllCookies:',JSON.stringify(cookieArray, null, 4));
      });
	  return jar;
   }
 }
export async function setJar(jarParam) {
	jar = jarParam;
}
function logCookies(jar){
    jar._jar.store.getAllCookies(function(err, cookieArray) {
        if(err) throw new Error("Failed to get cookies");
        //console.log(JSON.stringify(cookieArray, null, 4));
    });
}

/*
> var URI = require("uri-js");
undefined
> URI.serialize(URI.parse("http://examplé.org/rosé?rosé=rosé"))
'http://xn--exampl-gva.org/ros%C3%A9?ros%C3%A9=ros%C3%A9'
*/