/*
app.start.ts
*/
import 'dotenv/config';

import * as Funcoes from './modulos/appMod/f.to.app';
import {write_file, write_fileA} from './modulos/appMod/writefile';
import {read_file, checkFileExists, read_fileStream} from './modulos/appMod/readfile';
import Looger from './modulos/appMod/looger.out';const looger= new Looger('App start Busca Loterica','0');

import {ConsultarLT} from './src/app.consulta.loterica';
import {FL_JAFOI, FL_PsJAFOI, MAXTH} from './src/app.const';


import Urls from "./urls.json";
import { exit } from 'process';


/*Variaveis*/
export var TempCheck=[];
export var MxTh=0;
export var iPosicao=0;
export var UEST:any;

/**/

(async () => {
    await looger.consoleLog(`APP[IN-START]: ${process.memoryUsage().rss / 1024 / 1024} MiB`);
    
    /*--*/
    let FLPsJAFOI = await read_file(FL_PsJAFOI);
    if(FLPsJAFOI!=false && FLPsJAFOI!=''){
        iPosicao=parseInt(FLPsJAFOI as string);
    }
    /**/
    let JAFOIEST= await read_file(FL_JAFOI)as any;
    if(JAFOIEST==false) JAFOIEST='';       

    
    const MAXESTADOS=(Urls.Estados.length -1);

    async function status(){
        await looger.consoleLog('STATUS', UEST, Urls.Estados[iPosicao], 'TH:',TempCheck.length, 'POS:',iPosicao, 'MAXTH:',MAXTH);
    }



    function set_check(iPs){
        if(Urls.Estados[iPs] !== undefined){
            UEST=Urls.Estados[iPs];
            if(JAFOIEST.includes(UEST)){

            }
            else{
                looger.consoleLog('TESTANDO ESTADO:',UEST);
                TempCheck.push(
                    ConsultarLT(Urls.Estados[iPs], iPs)
                );
            }
            iPosicao++;
        }
    }

    async function rem_check(){
        if(TempCheck.length > 0){
            //await looger.consoleLog('REM-CHECK');
            TempCheck.forEach((element,i) => {
                element.then(async(e)=>{
                    if(e.result===true){
                        //await looger.consoleLog('TempCheck-then',e,i);
                        TempCheck.splice(i,1);
                    }
                    else
                    if(e.result===false){
                        TempCheck.splice(i,1);
                        set_check(e.iPs);
                    }
                });
            });
        }
    }

    

    /**-/
        ConsultarLT('AP', 1);
        return;
    /**/

    
    while(true){
        
        
        if(TempCheck.length < MAXTH && iPosicao <= MAXESTADOS){
            set_check(iPosicao);
            //await looger.consoleLog('SET-CHECK', iPosicao , MAXESTADOS , TempCheck.length);
        }
        else
        await Funcoes.wsleep(1000);
        
        
        //status();
        rem_check();
            
        
        
        if(iPosicao > MAXESTADOS && TempCheck.length == 0){
            await looger.consoleLog('FIM DA LISTA DE ESTADOS');
            break;
        }



        await Funcoes.wsleep(1);
    }
    
    
})();
