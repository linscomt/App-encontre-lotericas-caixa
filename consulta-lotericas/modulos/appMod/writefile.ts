/*  
  ./funcoes/rw/writefile.js
*/

//var Promise = require('bluebird');
//var fs = Promise.promisifyAll(require('fs'));

import * as fs from 'fs';
//import iconv from '../../node_modules/iconv-lite/lib/index'; //npm i @types/pika-iconv-lite --save-dev //npm i iconv-lite


function write_file(filePathName:string, texto:string, formt=''){//utf-8
return new Promise(async(resolve) => { 
    try {
      if(formt!==''){
        var iconv = require('iconv-lite');      
        texto= iconv.encode(texto, formt, {stripBOM: false});
      }
        resolve(
            fs.appendFileSync( filePathName, texto )
        );    
    } catch (error) {
        console.error(error);
        resolve(false);
    }
    
});
}

function write_fileA(filePathName, texto, formt=''){//latin1//utf-8
  return new Promise(async(resolve) => { 
      try {
        if(formt!==''){
          var iconv = require('iconv-lite');
          texto= iconv.encode(texto, formt, {stripBOM: false});
        }
          resolve(
              fs.writeFileSync( filePathName, texto)
          );    
      } catch (error) {
          console.error(error);
          resolve(false);
      }
  });
}

function write_fileB(filePathName:string, texto:string){
  //append
  fs.appendFile(filePathName, texto, function (err) {
    if (err){
      console.error(err);
      return;
    } 
    //console.log('Arquivo TESTE Criado', filePathName);
    
  });
}

function write_fileC(filePathName:string, texto:string){
  //append
  fs.writeFile(filePathName, texto, function (err) {
    if (err){
      console.error(err);
      return;
    } 
    console.log('Arquivo Criado');
    
  });
}



function write_path(dirPath:string){
  //Verifica se não existe
  if (!fs.existsSync(dirPath)){
    //Efetua a criação do diretório
    try{fs.mkdirSync(dirPath);return true;}catch(e){return false;}
  }else return false;
}

function write_pathAS(dirPath:string){

  //Verifica se não existe
  if (!fs.existsSync(dirPath)){
    //Efetua a criação do diretório
    fs.mkdir(dirPath, (err) => {
        if (err) {
            console.log("Deu ruim...");
            return
        }

        console.log("Diretório criado! =)")
    });
  }else return false;
}

export {
  write_file, write_fileA, write_fileB, write_fileC, write_path
}

 