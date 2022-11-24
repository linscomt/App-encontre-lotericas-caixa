/*
app.consulta.loterica.ts
*/
import 'dotenv/config';

import * as Funcoes from '../modulos/appMod/f.to.app';
import {write_file, write_fileA} from '../modulos/appMod/writefile';
import {read_file, checkFileExists, read_fileStream} from '../modulos/appMod/readfile';
import Looger from '../modulos/appMod/looger.out';const looger= new Looger('App start Busca Loterica','0');
import * as FPuppeteer from '../modulos/appPU/f.puppeteer';

    
import Urls from "../urls.json";
import { exit } from 'process';

async function AP_CriarPU(PU, FPuppeteer, DATAPROXY, AgentUSER){
    /**/
    PU= await FPuppeteer.CriarPUU(PU, DATAPROXY, AgentUSER);
    if(await PU===false||await PU===undefined){
        await looger.consoleINFO('ERROR AO CRIAR APP....', await PU);
        //process.exit();
        return {};
    }
    else{
        await looger.consoleINFO('APP CRIADO....');
        return PU;
    }
}

async function AP_setURL(PU, FPuppeteer, URL){
    /*-URL='https://www9.safraempresas.com.br/ibj.html#/'-*/
    return await FPuppeteer.GotoPagina(PU.page, URL , 60000);
    //await FPuppeteer.Events_ON(PU.page, 'dialog', DialogMessage);
    //await PU.page.evaluate(async() =>{ alert('Teste alert box') });
}

async function LTcx_SelectLOTERICA(page){
/*
    div[class="form form-d form-vertical"]
        div[class="select-button"]
            select[name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$ddlTipo"][id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_ddlTipo"]
                if      option[selected="selected"][value="2"]
                ...
                else if option[value="2"]
                ...

    document.querySelector("#ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_ddlTipo")
    document.querySelector("#ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_ddlTipo > option:nth-child(3)")

*/
    return 'Lotéricas';
}

async function LTcx_SelectESTADO(ESt){
/*    
    <select name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$ddlUf" id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_ddlUf" class="select-d" style="opacity: 0;">
	    <option value="">UF</option>
	    <option value="AC">Acre</option>
	    . . .
        <option selected="selected" value="BA">Bahia</option>
        . . .
	    <option value="TO">Tocantins</option>
    </select>
*/
    return true;
}

async function LTcx_GetListaCidades(page){
    let Listas=[];
    let L=await FPuppeteer.GetSrcObjHtml(page,
        'select[name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$ddlCidade"][id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_ddlCidade"][class="select-d"]'
    ) as any;
    
    if(L.includes('<option value="')){
        L=L.split('<option value="');
        //console.log('L:',L);
        await L.forEach(element => {
            if(element!='' && !element.includes('Cidade') ){
                let s1=element.substring(0,element.indexOf('">'));
                let s2=element.substring(element.indexOf('">')+2, element.indexOf('</'));
                //console.log({s1,s2});
                Listas.push({value:s1,cidade:s2});
            }
        });
    }
    return Listas;
}

async function LTcx_SelectCIDADE(Value, Cidade){
/*    
    <select name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$ddlCidade" id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_ddlCidade" class="select-d" style="opacity: 0;">
	    <option value="0">Cidade</option>
	    <option value="345">ABAIRA</option>
	    <option value="346">ABARE</option>
	    . . .
	    <option selected="selected" value="1017">SALVADOR</option>
	    <option value="1019">SANTA BARBARA</option>
	    . . .
	    <option value="1151">XIQUE-XIQUE</option>
    </select>
*/
    return true;
}

async function LTcx_BuscaLotericas(page){
    let btBuscar='input[name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$btnBuscar"][value="Buscar"][id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_btnBuscar"]';
    await FPuppeteer.Click(page, btBuscar);
    return true;
}

async function LTcx_VerMaisLotericas(page){
    let lenHTML1=await FPuppeteer.getLenHtml(page);
    
    let btVerMais= 'div[id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_pnlVerMais"][class="resultado-busca-item ver-mais"] input[type="submit"][name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$btnVerMais"][value="Ver mais"][id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_btnVerMais"][class="btn blue-text btn-small non-fluid index-link"]';
    await FPuppeteer.Click(page, btVerMais);

    let lenHTML2=await FPuppeteer.getLenHtml(page);

    if(lenHTML1 !== lenHTML2)
    return true;else;return false;
}


async function LTcx_ListarLotericas(page){
    //<ul class="no-bullets founded"> 
    //<li class="indice-letter-group">
    let Listas=[];
    let L=await FPuppeteer.GetSrcObjHtml(page,
        'ul[class="no-bullets founded"]'
    ) as any;

    if(L.includes('<div class="resultado-busca-item">')){
        Listas=L.split('<li class="indice-letter-group">');
    }

    return Listas;
}

async function LTcx_SalvarLista(L, E){
return new Promise(async resolve => {
    console.log('---LTcx_SalvarLista-----',L);

    for (let index = 0; index < L.length; index++) {
        const element = L[index];
        if(element!='') await LTcx_SalvarLotericas(element, E);
    }

    console.log('---LTcx_SalvarLista-----');
    resolve(true);
});
}

async function LTcx_SalvarLotericas(data, E){
    //console.log('LTcx_SalvarLotericas:',E,"\n",data);

    data=data.replace(/<br>                                        /g,"\n");
    
    if(data==='')return false;
    let Title=await Funcoes.getstrValue(
        data, 
        '<h4 class="resultado-busca-titulo">',
        '</h4>'
    );

    let Endereco=await Funcoes.getstrValue(
        data, 
        '<p style="text-transform: none;">',
        '</p>'
    );

    let RazaoSocial=await Funcoes.getstrValue(
        data, 
        '<b>Razão Social:</b>',
        '</p>'
    );

    
    async function limpar(dt){
        dt=await dt.replace(/<b>/g,"");
        dt=await dt.replace(/<\/b>/g,"");
        dt=await dt.replace(/<br>/g,"");
        return await dt;    
    }

    let FMT= await limpar(Title.message.trim())+"\n"+
    await limpar(Endereco.message.trim())+"\n"+
    'RzS:'+
    await limpar(RazaoSocial.message.trim());
    
    

    await write_file('./ListaLT_01'+E+'.txt', 
        FMT+"\n---------------------------------------------------\n"
    );

    FMT=FMT.replace(/\n/g,'|');
    await write_file('./ListaLT_02'+E+'.txt', 
       FMT+"\n"
    );
    return true;
}

export async function ConsultarLT(ESt, iPs, FL_PsJAFOI){
return new Promise(async resolve => {
    /**-/
    let tm = Funcoes.randomIntFromInterval(2,7);
    await Funcoes.wsleep(tm  * 1000);
    await looger.consoleINFO_OK('TESTE-ConsultarLT',tm, ESt, iPs);
    /**/

    /*-Variaveis-*/
    let s_message='ConsultarLT_START';
    let AgentUSER='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36';
    let PU={}as any;        //:{ page: any; browser: any; };
    let DATAPROXY={} as any;//:{'result': any, URLPROXIE: any='', URLPWD: any};
    let ListaF=false as any;

    /*-CRIAR o PU-*/
    PU= await AP_CriarPU(PU, FPuppeteer, DATAPROXY, AgentUSER);
    /**/

    /*-CHAMAR URL-*/
    let PG=await AP_setURL(PU, FPuppeteer, Urls.paginaBuscaLotericasT);
    /**/

    /*--*/
    await LTcx_SelectLOTERICA(PU.page);
    /*--*/

    /*-SRC HTml-*-/
    let srcHTML=await FPuppeteer.get_TextHtmlPage(PU.page);
    console.log(srcHTML);
    await write_fileA('./HTML3-code.html',srcHTML);
    /*--*/
    



    /*--*/
    if(await LTcx_SelectESTADO(ESt)){
        let ListaCD = await LTcx_GetListaCidades(PU.page);
        
        for (let index = 0; index < ListaCD.length; index++) {
            const element = ListaCD[index];
            
            await LTcx_SelectCIDADE(element.value, element.cidade);
            await LTcx_BuscaLotericas(PU.page);
            
            /**/
            while(true){
                let ListaLT=await LTcx_ListarLotericas(PU.page);
                if(await LTcx_SalvarLista(ListaLT, ESt)){
                    if(await LTcx_VerMaisLotericas(PU.page)){
                        console.log('VERMais-True', element.value, element.cidade);
                    }
                    else{
                        console.log('VERMais-false', element.value, element.cidade);
                        break;
                    }
                }


            }
            /**/

        }

        
        //await write_fileA(FL_PsJAFOI, iPs.toString() );
        //await write_file(FL_PsJAFOI, ESt+"\n" );
    
        resolve({result:true, ESt, iPs, s_message});
    }
    else
    resolve({result:false, ESt, iPs, s_message});


    await looger.consoleINFO_OK('TESTE-ConsultarLT', ESt, iPs);
   // await FPuppeteer.Destroi(PU);
    
    
    
});
} 

