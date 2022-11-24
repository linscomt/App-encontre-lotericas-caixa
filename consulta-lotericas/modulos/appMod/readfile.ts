
import * as fs from 'fs';


//var Promise = require('bluebird');
//var fs = Promise.promisifyAll(require('fs'));
//const fs = require ('fs').promises;



async function checkFileExists(file) {
    return fs.promises.access(file)
             .then(() => true)
             .catch(() => false)
}
async function read_file(filePathName:string, format='utf-8'){
    //console.log('READ_FILE:',filePathName)
    try{
        if(await checkFileExists(filePathName)===false){
            console.error('Arquivo não foi encontrado:',filePathName);
            return false;
        }
    
    return new Promise(async(resolve) => {
        var iconv = require('iconv-lite');
        resolve(await iconv.decode(fs.readFileSync(filePathName), format, {stripBOM: false}));

        //fs.readFileSync(filePathName, "utf8").then((result)=>{
        //    //console.log('result=',result);
        //    resolve(result);
        //}).catch((e)=>{
        //    console.error(e);
        //    resolve(false); 
        //});

        //fs.readFile( filePathName, 'utf-8', function(err, contents){
        //    if(err){
        //        console.error(err);
        //        resolve(false);return; 
        //    }else{
        //        //console.log('contents=',contents);
        //        resolve(contents);
        //    }
        //})

    });    
    }catch(e){ 
        console.error(e);
        return false; 
    }
}

//fs.writeFile( filesv, textf, function() {
//    console.log("*** COIN_Arquivo salvo", filesv);
//});


function read_file_s(filePathName, format='utf-8'){
    try{
        fs.readFile( filePathName, function(err, contents){
            if (err) throw err;
            var iconv = require('iconv-lite');
            return iconv.decode(contents, format, {stripBOM: false});
        })
    }catch(e){ console.error(e); return false;}
}

//async function checkFileExists(file) {
//    return fs.promises.access(file, fs.F_OK)
//             .then(() => true)
//             .catch(() => false)
//}
/*
async function read_file(filePathName){
    
    try{
    
        if(await checkFileExists(filePathName)===false){
            console.error('Arquivo não foi encontrado:',filePathName);
            return false;
        }
        
    
    return new Promise(async(resolve) => {
    
        fs.readFileAsync(filePathName, "utf8").then((result)=>{
            //console.log('result=',result);
            resolve(result);
        }).catch((e)=>{
            console.error(e);
            resolve(false); 
        });

        //fs.readFile( filePathName, 'utf-8', function(err, contents){
        //    if(err){
        //        console.error(err);
        //        resolve(false);return; 
        //    }else{
        //        //console.log('contents=',contents);
        //        resolve(contents);
        //    }
        //})

    });    
    }catch(e){ 
        console.error(e);
        return false; 
    }
}
*/

async function read_fileStream(dir, format='utf-8'){
return new Promise(async(resolve) => {
    try{
        var iconv = require('iconv-lite');
        let readableStream= await iconv.decode(fs.createReadStream( dir ), format, {stripBOM: false});
        await readableStream.on('error', function (error) {
            console.log(`error: ${error.message}`);
            resolve(false);
        })
        //let OutText:any=false;
        await readableStream.on('data', async(chunk) => {
            //console.log('DATA-STR:',chunk);
            //OutText= await chunk;
            resolve( chunk);
        })
        
        
    }catch(e){resolve( false);}
});
}



export{ checkFileExists, read_file, read_file_s, read_fileStream}

//module.exports = { 
//    //read_file    
//}  