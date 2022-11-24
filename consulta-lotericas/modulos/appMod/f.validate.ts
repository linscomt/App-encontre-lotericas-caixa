/*
f.validate.ts
*/

import Logger from './looger.out';var logger=new Logger('F Validate', process.pid.toString() );


export async function checar_dados(Data, Testar/*:['CPF','NIS','BFC'][0]*/,Delimitador='|'){
    let ALL;

    if(Testar==='CPF'){
        //,CPF,NIS,SENHA,BENEF,OUTROS;
        logger.consoleLog('TESTANDO CPF')
    }else
    if(Testar==='NIS'){
        //,CPF,NIS,SENHA,BENEF,OUTROS;
        logger.consoleLog('TESTANDO NIS')
    }else
    if(Testar==='BNF'){
        /*-CPF|BENEF|NOME|DtNasc|AnoMesAtualização|DtInicio|Descrição*/
        ALL= Data.split(Delimitador);
        let CPF=ALL[0];
        let BENEF=ALL[1];
        let NOME=ALL[2];
        let DTNASC=ALL[3];
        //logger.consoleLog('TESTANDO BENEFICIO', {ALL});
        return {result:true, CPF, BENEF, NOME, DTNASC}
    }
    else return {result:false}
		  	

}