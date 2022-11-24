/*--
f.to.app.js--
*/


import * as ReadWrite_file from './readfile';
import * as WriteFile_file from './writefile';
import lineReader from 'line-reader';
import readline from 'readline';
import fs from 'fs';

/**
 * 
 * @param encodedString 
 * @returns 
 */
export function decodeEntities(encodedString) {
  var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  var translate = {
      "nbsp":" ",
      "amp" : "&",
      "quot": "\"",
      "lt"  : "<",
      "gt"  : ">"
  };
  return encodedString.replace(translate_re, function(match, entity) {
      return translate[entity];
  }).replace(/&#(\d+);/gi, function(match, numStr) {
      var num = parseInt(numStr, 10);
      return String.fromCharCode(num);
  });
}


/**
 * 
 * @param Text 
 * @param index1 
 * @param index2 
 * @param value 
 * @returns 
 */
 export async function setstrValue(Text:string, TextIN:string, index1, index2,value) {
  try {
    let T1= Text.split(index1);
    let T2= T1[value].split(index2);
    //console.log('1T1:',T1);
    //console.log('1T2:',T2);
    //console.log('2T:',T1[value]);
    //console.log('3T:',T1[value].split(index2)[0]);
    /*1T: [
      'https://promobank.com.br/sistema/corpo.php?&cli_lote=6766336',
      '10&src=iniciarCampanha/index.php&tipoCampanha=campanhaLeads'
    ]
    1T1: [
      'https://promobank.com.br/sistema/corpo.php?&cli_lote=6766336',
      '10&src=iniciarCampanha/index.php&tipoCampanha=campanhaLeads'
    ]
    1T2: [ '10', 'src=iniciarCampanha/index.php', 'tipoCampanha=campanhaLeads' ]

    https://promobank.com.br/sistema/corpo.php?&cli_lote=6766336&limite=10  &src=iniciarCampanha/index.php&tipoCampanha=campanhaLeads
    https://promobank.com.br/sistema/corpo.php?&cli_lote=6766336&limite=1000&src=iniciarCampanha/index.phptipoCampanha=campanhaLeads
*/
    let sOUT='';
    T1.forEach((e,i)=>{
      if(i<(T1.length-1))
      sOUT+=e+index1;
    });
    sOUT+=TextIN+index2;
    T2.forEach((e,i)=>{
      if(i>0&&i<(T2.length-1))
      sOUT+=e+index2;
      else
      if(i>0) sOUT+=e;
    });

    
  return {
          success: true,
          message: sOUT //Text.split(index1)[value].split(index2)[0]
      };
  } catch (e) {
      return {
          success: false, message:''
      };
  }
}

/**
 * 
 * @param Text   Conteudo
 * @param index1 
 * @param index2 
 * @param value 
 * @returns 
 */
export async function getstrValue(Text:string, index1, index2, value=1) {
  try {
    //let T1= Text.split(index1);
    //console.log('1T:',T1);
    //console.log('2T:',T1[value]);
    //console.log('3T:',T1[value].split(index2)[0]);

      return {
          success: true,
          message: Text.split(index1)[value].split(index2)[0]
      };
  } catch (e) {
      return {
          success: false, message:''
      };
  }
}

/**
 * 
 * @param obj 
 * @returns 
 */
function isEmptyObject(obj)
{
	return !!Object.values(obj).length;    
}
/**
 * 
 * @param {*} min 
 * @param {*} max 
 * @returns Number
 */
 function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
 }
 

 export const leftZeros = (num, places) => String(num).padStart(places, '0');
 export const rigthZeros = (num, places) => String(num).padEnd(places, '0');
 export const formatNumber = (num, places) => String(num).padStart(places, '0');
 
/**
 * 
 * @param ms 
 * @returns 
 */
async function wsleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

/**
 * 
 * @param Data: String
 * @returns Array
 */
export async function getLista(Data){
  let lLista:[];
  if(Data.indexOf('<br />')>-1){
      lLista= Data.split("<br />")
  }
  else
  if(Data.indexOf('<br>')>-1){
    lLista= Data.split("<br>")
  }
  else{
      lLista= await Data.split(/\r?\n/);
  }
  return {'Lista':lLista, 'Len':lLista.length};
}


/**
 * 
 * @returns 
 */
async function static_LOADFILES(fLISTANORMAL, fLISTALOGIN, fJAFOI='jafoi.txt', dirPath='\\listas\\'){
	if(fJAFOI===undefined||fJAFOI===''){fJAFOI='jafoi.txt'}
  if(dirPath===undefined||dirPath===''){dirPath='\\listas\\'}
  //let RJ= await ReadWrite_file.read_fileStream(dirPath+fJAFOI);console.log('RJ:', await RJ)
  
  /*-ARQ-Com dados testados-*/
  let listJAFOI:any='';
  listJAFOI= await ReadWrite_file.read_file(dirPath+fJAFOI) as any;
  if(listJAFOI===false||listJAFOI===''){
    listJAFOI='|';
  }

  /*--*/
  let splittarDATA=false;

	/*CPF        |SENHA   |COOPERATIVA|CONTA
    12345678909|21314151|0262       |46914-0*/
  //'./listas/ListaLOGIN.txt'
  let listaLOGIN:any;
  if(fLISTALOGIN!==undefined && fLISTALOGIN!==''){
    listaLOGIN= await ReadWrite_file.read_file(dirPath+fLISTALOGIN) as any;
    if(listaLOGIN!==false){
      //listJAFOI= await ReadWrite_file.read_file('./listas/jafoiLtLOGIN.txt') as any;
      listaLOGIN= await listaLOGIN.split(/\r?\n/);
      if(listaLOGIN[0]!==undefined){
        if(listaLOGIN[0].indexOf('|') > -1 || listaLOGIN[0].indexOf(':') > -1){
          splittarDATA=true;
        }
      }
    }
    else
    console.log('ERRO AO carregar arquivo Lista com SENHA....', listaLOGIN);
  }else listaLOGIN=false;

	/*-TESTE-STRING-*-/console.log({'DADOS-LENGTH':listaDATA.length, 'ObjLength': Object.keys(listaDATA).length, 'DATA':listaDATA[0], 'SELECT':Object.keys(listaDATA)[0] });/*--*/
  //'./listas/ListaCpfTelCnpjEmail.txt'
  let listaDATA:any;
  if(fLISTANORMAL!==undefined && fLISTANORMAL!==''){
	  listaDATA= await ReadWrite_file.read_file(dirPath+fLISTANORMAL) as any;
    if(listaDATA!==false){
      //listJAFOI= await ReadWrite_file.read_file('./listas/jafoiLtCpfTel.txt') as any;
      listaDATA= await listaDATA.split(/\r?\n/);  
      /*if(listaDATA[0]!==undefined){
        if(listaDATA[0].indexOf('|') > -1){
          splittarDATA=true;
        }
      }*/
    }
    //else console.log('ERRO NO arquivo Lista ....', listaDATA);
  }else listaDATA=false;
	
	return [true,listJAFOI,listaDATA,splittarDATA, listaLOGIN];
}


export async function Jafoi(str, PathFile) {
  //JAFOIAQ = JAFOIAQ + str+'|';
  await WriteFile_file.write_file(PathFile, await str+'\n');
}


/**
 * 
 * @param TxtSearch 
 * @param File 
 * @returns 
 */
export async function SearchTextInFileA(TxtSearch, File) {
  const fileStream = fs.createReadStream(File);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    if(line.indexOf(TxtSearch)>-1||line.includes(TxtSearch)){
      return true;
    }
    
  }

  return false;
}

/**
 * 
 * @param TxtSearch 
 * @param File 
 * @returns 
 */
export async function SearchTextInFile(TxtSearch, File){
return new Promise(async (resolve) => {
    let RD= await ReadWrite_file.read_file(File);
    if(RD===false||RD===''){resolve(false);return;}

    lineReader.eachLine(File, async function(line, last) {
      if(line.indexOf(TxtSearch)>-1){
        resolve(true);return false;
      }
      if(await last===true)resolve(false);
    });

})
.catch(e=>{
  return false;
})
}
/**/


/**
 * 
 */
let ArCOOKIE={}
async function get_COOKIE(Header){
	try{await Header['set-cookie'].forEach(async(e)=>{
		let C= await e.substring(0, e.indexOf('; ')+2);
		let A=await C.split('=');
		ArCOOKIE[A[0]]=A[1];
		//console.log(A[0],A[1])
	});}catch(e){}
}
async function att_Cooie(Header, _gid_ga=''){
	let iCOOKIE='';
	iCOOKIE+= _gid_ga;
	await get_COOKIE(Header);
	try{
		//console.log('ArCOOKIE:',ArCOOKIE['__uzma']);
		Object.entries(ArCOOKIE).forEach(([key, value], index) => {
			//console.log(key, value, index);
			iCOOKIE+=key+'='+value;
		});
	}catch(e){}
	return iCOOKIE;
}
/*-Convert-*/

/**
 * 
 * @param body 
 * @param fromEncoding 
 * @returns 
 */
export const convertToUTF8 = <T extends any>(body: T, fromEncoding = 'iso-8859-1'): T => {
  var iconv = require('iconv');      
  const ic = new iconv.Iconv(fromEncoding, 'utf-8')
  const buf = ic.convert(body)
  return buf.toString('utf-8')
}


 //module.exports = { wsleep, randomIntFromInterval }
 export { isEmptyObject, wsleep, randomIntFromInterval, static_LOADFILES }