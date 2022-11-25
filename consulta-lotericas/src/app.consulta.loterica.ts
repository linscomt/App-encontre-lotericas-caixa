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

import {OutListaF1,OutListaF2,TEmpMemCD, FL_PsJAFOI, FL_JAFOI} from './app.const';


async function LaodingPG(page){
    //<div id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036">
    //document.querySelector("#loading > div")

    let CLoop=5;
    while(true){
        let RWLoop = await FPuppeteer.WAITLoopB(page, ['div[id="loading"][style="display: block;"]'], 1);
        if(RWLoop.result==false){
            return true;
        }
        if(CLoop <= 0)break;else;CLoop--;
        await Funcoes.wsleep(1000);
    }
    await looger.consoleEINFO('LOADING.......');
    return false;
}

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
    let selectOptionLT='div[class="form form-d form-vertical"] div[class="select-button"] select[name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$ddlTipo"][id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_ddlTipo"]';
    //<option value="2">Lotéricas</option>
    try{
        await page.select(selectOptionLT, '2');
        await looger.consoleEINFO('SELECIONOU LOTERICA');
        return true;
    }catch(e){}
    return false;
    
}

async function LTcx_SelectESTADO(page,ESt, sName=''){
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
    let selectOptionES = 'div[class="form form-d form-vertical"] div[class="select-button"] select[name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$ddlUf"][id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_ddlUf"]';
    try{
        let CLoop1=0;
        while(true){
            await FPuppeteer.OptionSelect(page, selectOptionES, ESt, sName);
            await Funcoes.wsleep(1);
            
            let CLoop=0;
            while(true){
                //let RWLoop = await FPuppeteer.WAITLoopB(page, ['div[id="loading"][style="display: block;"]'], 2);
                let RWLoop=LaodingPG(page);
                if(await !RWLoop == false){
                    await looger.consoleEINFO('SELECIONOU ESTADO', 'sUF');
                    return true;
                }
                if(CLoop > 3){
                    break;
                }else CLoop++;
            }

            if(CLoop1 > 1){
                return false;
            }else CLoop1++;
        }

        //let sUF=await FPuppeteer.GetTextObjHTML(page, selectOptionES);
        //await FPuppeteer.OptionselectB(page, selectOptionES, ESt);
        //return true;
    }catch(e){}
    return false;
}

async function LTcx_GetListaCidades(page){
    /*
    <select name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$ddlCidade" id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_ddlCidade" disabled="disabled" class="aspNetDisabled select-d" style="opacity: 0;">
    						<option selected="selected" value="">Cidade</option>

    					</select>
    */

    let selectOptionCD = 'div[class="form form-d form-vertical"] div[class="select-button"] select[name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$ddlCidade"][id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_ddlCidade"]';
    
    let CLoop=0;
    let Listas=[];
    let L:any;

    let RWLoop=LaodingPG(page);
    await FPuppeteer.WAITLoopB(page, [selectOptionCD]);

    while(true){
        
        L=await FPuppeteer.GetSrcObjHtml(page,
            selectOptionCD
        );
        //await looger.consoleEINFO('LTcx_GetListaCidades-L:', L, '|');
        if(L==='<option selected="selected" value="">Cidade</option>'){
            await looger.consoleEINFO('SEM LISTA CIDADES');
        }
        else{
            await looger.consoleEINFO('LISTA de CIDADES');
            break;
        }

        if(CLoop > 2){
            return [];
        }else{ CLoop++; await Funcoes.wsleep(1000);}
    }
    

    try {
        if(L.includes('<option value="')){
            L=L.split('<option value="');
            //console.log('L:',L);
            await L.forEach(element => {
                if(element!='' && !element.includes('Cidade') ){
                    let s1=element.substring(0,element.indexOf('">'));
                    let s2=element.substring(element.indexOf('">')+2, element.indexOf('</'));
                    //console.log({s1,s2});
                    //Listas.push({value:s1,cidade:s2});
                    Listas[s1]=({value:s1,cidade:s2});
                }
            });
        }
    } catch (error) {}
    return Listas;
    
}

async function LTcx_SelectCIDADE(page, Value, Cidade){
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
    let selectOptionCD = 'div[class="form form-d form-vertical"] div[class="select-button"] select[name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$ddlCidade"][id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_ddlCidade"]';
    return await FPuppeteer.OptionSelect(page, selectOptionCD, Value, Cidade);
}

async function LTcx_BuscaCDLotericas(page){
    let btBuscar='input[name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$btnBuscar"][value="Buscar"][id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_btnBuscar"]';
    await FPuppeteer.Click(page, btBuscar);
    return true;
}

async function LTcx_BuscaLotericas(page){
    
    let btBuscar='';

    //btBuscar='input[name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$txtCNPJ"][id="txtCNPJ"]';
    //if(await FPuppeteer.Click(page, btBuscar)===true){
    //    await looger.consoleINFO('OK BUSCAR 1');
    //    return true;
    //}

    //onclick="exibirLoading();WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$btnBuscar&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, false))"
    //[value="Buscar"]
    btBuscar="#ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_btnBuscar";
    //btBuscar='input[type="submit"][name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$btnBuscar"][id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_btnBuscar"]';
    //btBuscar='input[name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$btnBuscar"][value="Buscar"][id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_btnBuscar"]';
    await FPuppeteer.MouseMoveClick(page, btBuscar);
    await FPuppeteer.ClickB(page, btBuscar);
    if(await FPuppeteer.Click(page, btBuscar)===true){
        await looger.consoleINFO('OK BUSCAR 2');
        return true;
    }
    //div[id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_pnlCNPJ"]
	//div[class="separator"]
    
    return false;
}

async function LTcx_VerMaisLotericas(page){
    let lenHTML1=await FPuppeteer.getLenHtml(page);
    
    let btVerMais= 'div[id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_pnlVerMais"][class="resultado-busca-item ver-mais"] input[type="submit"][name="ctl00$ctl59$g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036$btnVerMais"][value="Ver mais"][id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_btnVerMais"][class="btn blue-text btn-small non-fluid index-link"]';
    if(await FPuppeteer.Click(page, btVerMais)==true){
        let lenHTML2=await FPuppeteer.getLenHtml(page);
        if(lenHTML1 !== lenHTML2) return true;else;return false;
    }
    else return false;
}


async function LTcx_ListarLotericas(page){
    //<ul class="no-bullets founded"> 
    //<li class="indice-letter-group">
    let RWLoop=LaodingPG(page);

    let CLoop=0;
    while(true){
        let RR=await FPuppeteer.WAITLoopB(page, ['ul[class="no-bullets founded"]'],1);
        //await looger.consoleINFO('LTcx_ListarLotericas',RR);
        if(RR.result==true) break;
        await Funcoes.wsleep(1000);
        if(CLoop > 0){break;}else CLoop++;
    }

    let Listas=[];
    try{
        let L=await FPuppeteer.GetSrcObjHtml(page,
            'ul[class="no-bullets founded"]'
        ) as any;

        if(L.includes('<div class="resultado-busca-item">')){
            Listas=L.split('<li class="indice-letter-group">');
        }

        await looger.consoleINFO_OK('LTcx_ListarLotericas -OK');
    }catch(e){}
    

    return Listas;
}

async function LTcx_SalvarLista(L, E, C){
return new Promise(async resolve => {
    console.log('--IN-LTcx_SalvarLista-----');

    for (let index = 0; index < L.length; index++) {
        const element = L[index];
        if(element!='') await LTcx_SalvarLotericas(element, E, C);
    }

    console.log('--OUT-LTcx_SalvarLista-----');
    resolve(true);
});
}

async function LTcx_SalvarLotericas(data, E, C){
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

    let FMT= 'Cidade:'+C+"\n"+
    await limpar(Title.message.trim())+"\n"+
    await limpar(Endereco.message.trim())+"\n"+
    'RzS:'+
    await limpar(RazaoSocial.message.trim());

    await write_file(OutListaF1 +E+'.txt', 
        FMT+"\n---------------------------------------------------$\n"
    );

    //await write_file(OutListaF1 +E+'C'+C+'.txt', 
    //    FMT+"\n---------------------------------------------------\n"
    //);

    FMT=FMT.replace(/\n/g,'|');
    await write_file(OutListaF2 +E+'.txt', 
       FMT+"\n"
    );

    console.log('LTcx_SalvarLotericas:',E, C, Title.message.trim());//,"\n",data);

    return true;
}

async function NenhumPonto(page){
    //<div id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_upPrincipal">
    //<h4 class="resultado-busca-titulo" style="margin: 100px;">Nenhum ponto de atendimento foi localizado com os dados informados.</h4>
    let resultado_busca='div[id="ctl00_ctl59_g_7fcd6a4b_5583_4b25_b2c4_004b6fef4036_upPrincipal"] h4[class="resultado-busca-titulo"]';
    let R=await FPuppeteer.GetTextObjHTML(page, resultado_busca);
    if(R!==false){
        if(R.includes('Nenhum ponto de atendimento foi localizado com os dados informados.'))return true;
    }
    console.log('GET-NenhumPonto',R);
    return R;
}



export async function ConsultarLT(ESt, iPs){
return new Promise(async resolve => {
    let V_C=await read_file(TEmpMemCD+ESt+'.log')as any;//V|C
    if(V_C==false) V_C='0';
    await write_fileA(TEmpMemCD+ESt+'.log', '0');

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
    let CPG=0;
    while(true){
        if(await AP_setURL(PU, FPuppeteer, Urls.paginaBuscaLotericas)!==false){
            break;
        }
        if(CPG >10){resolve({result:false, ESt, iPs, s_message:'#NAOCARREGOU#'});return;}
        CPG++;
        await looger.consoleEINFO('NAO CARREGOU', CPG);
        await Funcoes.wsleep(1000);
    }
    

    
    /**/

    /*--*/
    await LTcx_SelectLOTERICA(PU.page);
    /*--*/

    /*-SRC HTml-*-/
    let srcHTML=await FPuppeteer.get_TextHtmlPage(PU.page);
    console.log(srcHTML);
    await write_fileA('./HTML3-code.html',srcHTML);
    /*--*/
    
    /**-/
        await LTcx_SelectESTADO(PU.page, ESt);

        let ListaCD = await LTcx_GetListaCidades(PU.page);
        
        console.log(ListaCD[1017].value, ListaCD[1017].cidade);
        await LTcx_SelectCIDADE(PU.page ,ListaCD[1017].value, ListaCD[1017].cidade);

        //await LTcx_BuscaCDLotericas(PU.page);

        let ListaLT=[];
        while(true){
            await LTcx_BuscaLotericas(PU.page);
        
            ListaLT=await LTcx_ListarLotericas(PU.page);
            //await looger.consoleEINFO('ListaLT',ListaLT, ListaLT.length);

            if(ListaLT.length > 0)break;

            await looger.consoleINFO('NO LISTA');
            await Funcoes.wsleep(1000);

        }

        while(true){
            if(await LTcx_VerMaisLotericas(PU.page)==true){
                await looger.consoleEINFO('OK-BT-VERMAIS');
            }else{
                await looger.consoleEINFO('NO-BT-VERMAIS');
                break;
            }
        }

        ListaLT=await LTcx_ListarLotericas(PU.page);
        await LTcx_SalvarLista(ListaLT, ESt, ListaCD[1017].value);
    
        return;
    /**/


    /*--*/
    if(await LTcx_SelectESTADO(PU.page, ESt)){
        let ListaCD = await LTcx_GetListaCidades(PU.page);

        let OLDLocal='';

        
        for (let index = 0; index < ListaCD.length; index++) {
            const element = ListaCD[index];
            
            if(element!==undefined && parseInt(element.value) > parseInt(V_C[0]) ){

            
                let CLoopLD1=10;
                while(true){
                    if(await LaodingPG(PU.page)==true)break;
                    if(CLoopLD1 <= 0){
                        break;
                    }else CLoopLD1--;
                }if(CLoopLD1 <= 0){
                    await write_fileA(TEmpMemCD+ESt+'.log', element.value);
                    ConsultarLT(ESt, iPs);
                    resolve({result:false, ESt, iPs, s_message:'LOADING...'});
                    return;
                }

                await LTcx_SelectCIDADE(PU.page , element.value, element.cidade);

                let ListaLT=[];
                while(true){
                    await LTcx_BuscaLotericas(PU.page);
                    ListaLT=await LTcx_ListarLotericas(PU.page);
                    if(ListaLT.length > 0)break;
                    await looger.consoleINFO('NO LISTA', element.value);
                    if(await NenhumPonto(PU.page)===true)break;
                    await Funcoes.wsleep(1000);
                }

                
                

                if(ListaLT.length > 0){

                    while(true){
                        if(await LTcx_VerMaisLotericas(PU.page)==true){
                            await looger.consoleEINFO('OK-BT-VERMAIS');
                        }else{
                            await looger.consoleEINFO('NO-BT-VERMAIS');
                            break;
                        }
                    }
                    ListaLT=await LTcx_ListarLotericas(PU.page);
                    await LTcx_SalvarLista(ListaLT, ESt, element.cidade)
    
                    /**-/
                    while(true){
                        ListaLT=await LTcx_ListarLotericas(PU.page);
                        if(await LTcx_SalvarLista(ListaLT, ESt, element.value)){
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

                
            //}
            }

        }

        
        //await write_fileA(FL_PsJAFOI, iPs.toString() );
        //await write_file(FL_PsJAFOI, ESt+"\n" );
    
        resolve({result:true, ESt, iPs, s_message});
        await write_file(FL_PsJAFOI, iPs+"\n");
        await write_file(FL_JAFOI, ESt+"\n");
    }
    else
    resolve({result:false, ESt, iPs, s_message:'SELeCTESTADOERRO'});


    await looger.consoleINFO_OK('FIM-DA-Consulta-LT', ESt, iPs);
    await FPuppeteer.Destroi(PU);
    
    
    
});
} 

